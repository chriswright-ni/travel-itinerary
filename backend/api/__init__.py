from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Application factory - contains app configuration and blueprint registers
def create_app():
    
    app = Flask(__name__)
   
    # SQL Alchemy configuration per documentation
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///travel_itinerary.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    @app.route("/hello", methods=["GET"])
    def hello():
      return "Hello World!"
    return app