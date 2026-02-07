from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from ..models.trip_models import Trip
from ..models.itinerary_models import Day
from ..models.location_models import City, Country
from api2.models.user_models import db
from datetime import datetime, timedelta

trip_bp = Blueprint("trip_routes", __name__)


@trip_bp.route("/api/trips", methods=["GET"])
@jwt_required()
def get_trips():

  user_id = get_jwt_identity()

  trips = Trip.query.filter_by(user_id=user_id).all()
  trips_json = list(map(lambda trip: trip.to_json(), trips))

  print("DATA BACK TO FRONTEND")
  print(trips_json)

  return jsonify({"trips": trips_json}), 200


@trip_bp.route("/api/trips", methods=["POST"])
@jwt_required()
def save_trip():

  print("in save trip route")

  trip = request.json
  print("currentTrip when it reaches backend:")
  print(trip)
  userId = get_jwt_identity()

  # Main trip data
  tripId = trip.get("tripId")
  tripName = trip.get("tripName")
  headerImageUrl = trip.get("headerImageUrl")
  startDate = datetime.fromisoformat(trip.get("startDate")[0:10]).date()
  days = trip.get("days")
  endDate = startDate + timedelta(days - 1)
  
  # Location data
  locationData = trip.get("locationData", {})
  countryName = locationData.get("country")
  countryCode = locationData.get("country_code")
  cityName = locationData.get("place")


  trip_exists = Trip.query.filter_by(trip_id=tripId).first()

  
  country = Country.query.filter_by(country_code=countryCode).first()

  if country:
    print("Country exists, not currently added")
  else:
    country = Country(country_name=countryName, country_code=countryCode)
    db.session.add(new_country)
    db.session.flush()
    print("New country added")

  
  city = City.query.filter_by(city_name=cityName).first()

  if city:
    print("City exists, not currently added")
  else:
    city = City(city_name=cityName, country_id=new_country.country_id)
    db.session.add(new_city)
    db.session.flush()
    print("New city added")

  if trip_exists:
    print("Trip exists, not currently added")
  else:
    new_trip = Trip(trip_id=tripId, trip_name=tripName, trip_image_url=headerImageUrl, start_date=startDate, end_date=endDate, country_id=country.country_id, city_id=city.city_id, user_id=userId)
    db.session.add(new_trip)

    itinerary = trip.get("itinerary", [])
    # Itinerary data:
    for day in itinerary:
      dayNumber = day.get("dayNumber")
      print(dayNumber)

      day = Day(
        day_number = dayNumber,
        trip_id = tripId,
      )
      db.session.add(day)

    db.session.commit()
    print("Trip added")

  return jsonify({"msg": "Trip saved"}), 201


