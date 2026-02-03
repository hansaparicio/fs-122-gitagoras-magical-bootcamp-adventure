
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from sqlalchemy import inspect

from api.routes import api
from api.models import db

app = Flask(__name__)

# CONFIG
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "supersecretkey"

# INIT
db.init_app(app)
jwt = JWTManager(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})

# ROUTES
app.register_blueprint(api, url_prefix="/api")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        inspector = inspect(db.engine)
        print("TABLAS:", inspector.get_table_names())
    app.run(debug=True, port=5000)
