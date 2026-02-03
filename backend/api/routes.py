from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from api.models import db, User

import os
import json
import requests

api = Blueprint("api", __name__)

<<<<<<< new-eva
# REGISTER
=======
# =========================
# REGISTER
# =========================
>>>>>>> Main-Branch
@api.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"msg": "No data"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"msg": "Faltan campos"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Usuario ya existe"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email ya registrado"}), 400

    user = User(
        username=username,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "avatar": user.avatar
        }
    }), 201


<<<<<<< new-eva
# LOGIN
=======
# =========================
# LOGIN
# =========================
>>>>>>> Main-Branch
@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"msg": "No data"}), 400

    user = User.query.filter_by(username=data.get("username")).first()

    if not user or not check_password_hash(user.password, data.get("password")):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "avatar": user.avatar
        }
    }), 200


<<<<<<< new-eva
# ME
=======
# =========================
# ME
# =========================
>>>>>>> Main-Branch
@api.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
<<<<<<< new-eva
=======

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "avatar": user.avatar
    }), 200
>>>>>>> Main-Branch

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "avatar": user.avatar
    }), 200

<<<<<<< new-eva

# AVATAR
=======
# =========================
# AVATAR
# =========================
>>>>>>> Main-Branch
@api.route("/avatar", methods=["POST"])
@jwt_required()
def save_avatar():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    avatar = request.get_json()
    if not avatar:
        return jsonify({"msg": "Avatar vacío"}), 400

    user.avatar = avatar
    db.session.commit()

    return jsonify({"msg": "Avatar guardado"}), 200
<<<<<<< new-eva
    return jsonify(msg="Pergamino firmado correctamente")

=======
>>>>>>> Main-Branch


# =========================
# HTML RUNES (JUEGO)
# =========================
@api.route("/html-runes-hf", methods=["GET"])
def get_html_runes_hf():
    hf_token = os.getenv("HF_API_KEY")

    headers = {
        "Authorization": f"Bearer {hf_token}",
        "Content-Type": "application/json"
    }

    prompt = """
Eres una API que genera datos educativos.
Devuelve ÚNICAMENTE un JSON válido.

{
  "pairs": [
    { "id": 1, "term": "<h1>", "definition": "Título principal del documento HTML" }
  ]
}

Reglas:
- EXACTAMENTE 10 pares
- IDs del 1 al 10
"""

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 300,
            "temperature": 0.3
        }
    }

    try:
        response = requests.post(
            "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
            headers=headers,
            json=payload,
            timeout=30
        )

        raw = response.json()
        text = raw[0].get("generated_text", "") if isinstance(raw, list) else raw.get("generated_text", "")

        start = text.find("{")
        end = text.rfind("}") + 1
        parsed = json.loads(text[start:end])

        return jsonify(pairs=parsed["pairs"], source="huggingface")

    except Exception:
        return jsonify(
            pairs=[
                { "id": 1, "term": "<h1>", "definition": "Encabezado principal" },
                { "id": 2, "term": "<p>", "definition": "Párrafo" },
                { "id": 3, "term": "<img>", "definition": "Imagen" },
                { "id": 4, "term": "<a>", "definition": "Enlace" },
                { "id": 5, "term": "<body>", "definition": "Contenido visible" },
                { "id": 6, "term": "<br>", "definition": "Salto de línea" },
                { "id": 7, "term": "<strong>", "definition": "Texto fuerte" },
                { "id": 8, "term": "<input>", "definition": "Entrada de datos" },
                { "id": 9, "term": "<div>", "definition": "Contenedor" },
                { "id": 10, "term": "<span>", "definition": "Texto en línea" }
            ],
            source="fallback"
        )
