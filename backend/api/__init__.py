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

    # @app.route("/hello", methods=["GET"])
    # def hello():
    #     return "Hello World!"

    # @app.route("/search", methods=["GET"])
    # def search():
    #     url = "https://places-api.foursquare.com/places/search"

    #     headers = {
    #         "accept": "application/json",
    #         "X-Places-Api-Version": "2025-06-17",
    #         "Authorization": f"Bearer {PLACES_API_KEY}"
    #     }
    #     params = {"ll": "54.4203,-6.4548", "radius": 5000}

    #     response = requests.get(url, headers=headers, params=params)
    #     data = response.json()

    #     return jsonify(data)

    return app

    