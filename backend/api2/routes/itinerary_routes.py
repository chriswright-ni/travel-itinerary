from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from api2.models.user_models import db

itinerary_bp = Blueprint("itinerary_routes", __name__)


@itinerary_bp.route("/api/itinerary/save", methods=["GET"])
def save_itinerary():
  return jsonify({"msg": "Itinerary saved"}), 200