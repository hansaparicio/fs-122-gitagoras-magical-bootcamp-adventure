import os
import json
import requests
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
NO añadas explicaciones.

El JSON debe seguir EXACTAMENTE este esquema:

{
  "pairs": [
    {
      "id": 1,
      "term": "<h1>",
      "definition": "Título principal del documento HTML"
    }
  ]
}

Reglas:
- Genera EXACTAMENTE 6 pares
- Los términos deben ser HTML básico
- Las definiciones deben ser claras y cortas
- Los IDs deben ir del 1 al 6
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

        if isinstance(raw, list):
            text = raw[0].get("generated_text", "")
        else:
            text = raw.get("generated_text", "")

        start = text.find("{")
        end = text.rfind("}") + 1
        clean = text[start:end]

        parsed = json.loads(clean)
        pairs = parsed.get("pairs", [])

        if len(pairs) != 6:
            raise ValueError("Número incorrecto de pares")

        return jsonify({
            "pairs": pairs,
            "source": "huggingface"
        })

    except Exception as e:
        print("HF ERROR:", e, flush=True)

        return jsonify({
            "pairs": [
                { "id": 1, "term": "<h1>", "definition": "Título principal del documento HTML" },
                { "id": 2, "term": "<p>", "definition": "Define un párrafo de texto" },
                { "id": 3, "term": "<img>", "definition": "Inserta una imagen en la página" },
                { "id": 4, "term": "<a>", "definition": "Crea un enlace a otra página" },
                { "id": 5, "term": "<body>", "definition": "Contiene el contenido visible del documento" },
                { "id": 6, "term": "atributo", "definition": "Modifica una etiqueta HTML" }
            ],
            "source": "fallback"
        })
