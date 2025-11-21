from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from api.routes.search_routes import search_bp

load_dotenv()
PLACES_API_KEY = os.getenv("PLACES_API_KEY")

# Application factory - contains app configuration and blueprint registers
def create_app():
    
    app = Flask(__name__)
    CORS(app)

   
    # SQL Alchemy configuration per documentation
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///travel_itinerary.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    app.register_blueprint(search_bp)

    return app

    