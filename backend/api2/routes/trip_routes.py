from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from ..models.trip_models import Trip
from api2.models.user_models import db
from datetime import datetime

trip_bp = Blueprint("trip_routes", __name__)


@trip_bp.route("/api/trips", methods=["GET"])
@jwt_required()
def get_trips():

  user_id = get_jwt_identity()

  trips = Trip.query.filter_by(user_id=user_id).all()
  trips_json = list(map(lambda trip: trip.to_json(), trips))

  return jsonify({"trips": trips_json}), 200


@trip_bp.route("/api/trips", methods=["POST"])
@jwt_required()
def save_trip():

  trip = request.json

  userId = get_jwt_identity()


  tripId = trip.get("tripId")
  tripName = trip.get("tripName")
  headerImageUrl = trip.get("headerImageUrl")
  print(headerImageUrl)
  startDate = datetime.fromisoformat(trip.get("startDate")[0:10]).date()
  print(startDate)
  days = trip.get("days")

  trip_exists = Trip.query.filter_by(trip_id=tripId).first()

  if trip_exists:
    print("Trip exists, not currently added")
  else:
    trip = Trip(trip_id=tripId, trip_name=tripName, trip_image_url=headerImageUrl, start_date=startDate, country_id=1, user_id=userId)
    db.session.add(trip)
    db.session.commit()
    print("Trip added")

  return jsonify({"msg": "Trip saved"}), 201


