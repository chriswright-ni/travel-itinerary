from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from api2.models.user_models import db

trip_bp = Blueprint("trip_routes", __name__)


@trip_bp.route("/api/trips", methods=["GET"])
@jwt_required()
def get_trips():

  user_id = get_jwt_identity()

  trips = Trip.query.filter_by(user_id=user_id).all()
  trips_json = list(map(lambda trip: trip.to_json(), trips))

  return jsonify({"trips": trips_json}), 200


# @trip_bp.route("/api/trips/:id", methods=["GET"])
# @jwt_required()
# def get_trips():

#   user_id = get_jwt_identity()

#   trips = Trip.query.filter_by(user_id=user_id).all()
#   trips_json = list(map(lambda trip: trip.to_json(), trips))

#   return jsonify({"trips": trips_json}), 200