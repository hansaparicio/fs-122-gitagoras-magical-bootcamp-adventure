from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

app = Flask(__name__)


CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"], "supports_credentials": True}})

app.config["JWT_SECRET_KEY"] = "supersecretkey"



app.config["JWT_SECRET_KEY"] = "supersecretkey"
jwt = JWTManager(app)

USERS_FILE = "users.json"
def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, "r") as f:
        return json.load(f)
def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)
@app.after_request
def add_cors_headers(response):
   response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
   response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
   return response


@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    users = load_users()

  
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    if username in users:
        return jsonify({"msg": "Usuario ya existe"}), 400

    users[username] = {
        "password": generate_password_hash(password, method="pbkdf2:sha256"),
        "email": email,
        "avatar": None
    }

    save_users(users)

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/api/login", methods=["POST"])
def login():
    users = load_users()

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users.get(username)
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401




#mi usuario endpoint

@app.route("/api/me", methods=["GET"])
@jwt_required()
def get_me():
    users= load_users()
    username = get_jwt_identity()
    user = users.get(username)



@app.route("/api/avatar", methods=["POST"])
@jwt_required()
def save_avatar():
  users= load_users()
  username= get_jwt_identity()
  data = request.get_json()

  if not data:
      return jsonify({"msg": "no se enviaron datos"}), 400
  
  user = users.get(username)
  if not user:
     return jsonify({"msg": "usuario no encontrado"}), 404
  
  user["avatar"]= data
  save_users(users)
  return jsonify({"msg": "avatar guardado exitosamente"}), 200


@app.route("/api/avatar", methods=["GET"])
@jwt_required()
def get_avatar():
    users = load_users()
    username= get_jwt_identity()
    user = users.get(username)

    if not user:
        return jsonify({"msg":"usuario no encontrado"}), 404
    return jsonify(user.get("avatar", {})), 200



@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(msg="Acceso permitido al usuario autenticado")







if __name__ == "__main__":
    app.run(debug=True, port=5000)
