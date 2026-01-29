"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    # Check if user already exists
    existing_user = User.query.filter((User.email == email) | (User.username == username)).first()
    if existing_user:
        return jsonify({"msg": "Usuario ya existe"}), 400

    # Create new user
    new_user = User(
        username=username,
        email=email,
        password=generate_password_hash(password),
        is_active=True
    )
    
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Try to find user by username or email
    user = User.query.filter((User.username == (username or email)) | (User.email == (email or username))).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify(access_token=access_token), 200


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(msg=f"Acceso permitido al usuario: {current_user}"), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    return jsonify(user.serialize()), 200


@api.route('/avatar', methods=['POST'])
@jwt_required()
def save_avatar():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No se enviaron datos"}), 400
    
    # Store avatar data (you may want to add an avatar field to User model)
    # For now, just return success
    return jsonify({"msg": "Avatar guardado exitosamente", "avatar": data}), 200


@api.route('/avatar', methods=['GET'])
@jwt_required()
def get_avatar():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    # Return avatar data (placeholder for now)
    return jsonify({"avatar": {}}), 200
