from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User

api = Blueprint("api", __name__)


@api.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("username") or not data.get("password") or not data.get("email"):
        return jsonify(msg="Faltan campos"), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify(msg="Usuario ya existe"), 400

    user = User(
        username=data["username"],
        email=data["email"],
        password=generate_password_hash(data["password"]),
        scroll_signed=False
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=user.id)

    return jsonify(
        access_token=token,
        scroll_signed=user.scroll_signed
    ), 201


@api.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(username=data.get("username")).first()

    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify(msg="Credenciales incorrectas"), 401

    token = create_access_token(identity=user.id)

    return jsonify(
        access_token=token,
        scroll_signed=user.scroll_signed
    )

@api.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify(msg="Usuario no encontrado"), 404

    return jsonify(user.serialize())


@api.route("/sign-scroll", methods=["POST"])
@jwt_required()
def sign_scroll():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify(msg="Usuario no encontrado"), 404

    if user.scroll_signed:
        return jsonify(msg="El pergamino ya fue firmado"), 400

    user.scroll_signed = True
    db.session.commit()

    return jsonify(msg="Pergamino firmado correctamente")
