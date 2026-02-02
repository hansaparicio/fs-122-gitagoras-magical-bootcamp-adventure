import os
import json
import requests
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User

api = Blueprint("api", __name__)

# =========================
# AUTH
# =========================

@api.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify(msg="Faltan campos"), 400

    if User.query.filter_by(username=data["username"]).first():
        return jsonify(msg="Usuario ya existe"), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify(msg="Email ya registrado"), 400

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


# =========================
# GAME LOGIC
# =========================

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
NO escribas texto fuera del JSON.

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
                { "id": 1, "term": "<h1>", "definition": "Título principal del documento HTML" },
                { "id": 2, "term": "<p>", "definition": "Define un párrafo" },
                { "id": 3, "term": "<img>", "definition": "Inserta una imagen" },
                { "id": 4, "term": "<a>", "definition": "Crea un enlace" },
                { "id": 5, "term": "<body>", "definition": "Contenido visible" },
                { "id": 6, "term": "<br>", "definition": "Salto de línea" },
                { "id": 7, "term": "<strong>", "definition": "Texto importante" },
                { "id": 8, "term": "<input>", "definition": "Entrada de datos" },
                { "id": 9, "term": "<div>", "definition": "Contenedor" },
                { "id": 10, "term": "<span>", "definition": "Texto en línea" }
            ],
            source="fallback"
        )
