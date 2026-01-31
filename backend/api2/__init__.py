from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from api2.routes.search_routes import search_bp
from api2.routes.image_routes import image_bp
from api2.routes.auth_routes import auth_bp
from api2.routes.itinerary_routes import itinerary_bp
from api2.routes.trip_routes import trip_bp
# from api2.routes.mapbox_routes import mapbox_bp
# from api2.models.user_models import db
from api2.extensions import db



load_dotenv()
PLACES_API_KEY = os.getenv("PLACES_API_KEY")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

jwt = JWTManager()


# Application factory - contains app configuration and blueprint registers
def create_app():
    
    app = Flask(__name__)
    # CORS(app, resources={r"*": {"origins": "http://localhost:5173"}})
    # CORS(app)
    # CORS(app, resources={r"/*": {"origins": "*"}})
    # CORS(app,
    #     resources={r"/api/*": {"origins": "*"}})
    # CORS(app,
    #     resources={r"*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}})
    # CORS(app,
    #     resources={r"/api/*": {"origins": "http://localhost:5173"}})
    CORS(app, origins = "http://localhost:5173")

    # CORS(app, origins = "*")
   
    # SQL Alchemy configuration per documentation
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///travel_itinerary.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
    db.init_app(app)
    jwt.init_app(app)

    from .models.user_models import User
    from .models.trip_models import Trip
    from .models.itinerary_models import Day, Itinerary_Item
    from .models.place_models import Place
    from .models.location_models import City, Country
    from .models.category_models import Category

    with app.app_context():
        db.create_all()
        print("DB created")
    
    app.register_blueprint(search_bp)
    app.register_blueprint(image_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(itinerary_bp)
    app.register_blueprint(trip_bp)
    # app.register_blueprint(mapbox_bp)

    @app.route("/api/cors")
    def cors_test():
        return {"msg": "CORS working"}


    return app

    