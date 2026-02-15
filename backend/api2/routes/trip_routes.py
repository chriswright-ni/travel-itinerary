from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from ..models.trip_models import Trip
from ..models.itinerary_models import Day, Itinerary_Item
from ..models.location_models import City, Country
from ..models.place_models import Place
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

  # print("in save trip route")

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
  locationData = trip.get("locationData") or {}
  countryName = locationData.get("country")
  countryCode = locationData.get("country_code")
  cityName = locationData.get("place")

  
  country = Country.query.filter_by(country_code=countryCode).first()
  if country:
    print("Country exists, not currently added")
  else:
    country = Country(country_name=countryName, country_code=countryCode)
    db.session.add(country)
    db.session.flush()
    print("New country added")

  
  city = City.query.filter_by(city_name=cityName).first()
  if city:
    print("City exists, not currently added")
  else:
    city = City(city_name=cityName, country_id=country.country_id)
    db.session.add(city)
    db.session.flush()
    print("New city added")




  trip_exists = Trip.query.filter_by(trip_id=tripId).first()

  if trip_exists:
    print("Updating trip info")
    trip_exists.trip_name = tripName
    trip_exists.trip_image_url = headerImageUrl
    trip_exists.start_date = startDate
    trip_exists.end_date = endDate
    trip_exists.country_id = country.country_id
    trip_exists.city_id = city.city_id
  else:
    trip_exists = Trip(trip_id=tripId, trip_name=tripName, trip_image_url=headerImageUrl, start_date=startDate, end_date=endDate, country_id=country.country_id, city_id=city.city_id, user_id=userId)
    db.session.add(trip_exists)
    db.session.flush()
    # print("New trip added")

  # Delete previous itinerary item info
  day_subquery = db.session.query(Day.day_id).filter_by(trip_id=tripId)
  Itinerary_Item.query.filter(Itinerary_Item.day_id.in_(day_subquery)).delete(synchronize_session=False)

  # Delete provious day info
  Day.query.filter_by(trip_id=tripId).delete()

  db.session.flush()
  db.session.expire_all()

  itinerary = trip.get("itinerary", [])
  # Itinerary data:
  for day_object in itinerary:
    dayNumber = day_object.get("dayNumber")
    dayStartTime = datetime.strptime(day_object.get("dayStartTime"), "%H:%M").time()
    # print(dayNumber)

    day = Day(
      day_number = dayNumber,
      start_time = dayStartTime,
      trip_id = tripId,
    )
    db.session.add(day)
    db.session.flush()

    # Itinerary item data
    itineraryItems = day_object.get("itineraryItems", [])
    # print("Itinerary Items")
    # print(itineraryItems)

    # print("Items in backend")
    for item in itineraryItems:
      # print(item)
      itemId = item.get("id")
      itemStartTime = datetime.strptime(item.get("startTime"), "%H:%M").time()
      itemEndTime = datetime.strptime(item.get("endTime"), "%H:%M").time()
      recommendedDuration = item.get("recommendedDuration")

      # Place data
      fsqPlacesId = item.get("placeId")
      # placeId = item.get("placeId")
      placeName = item.get("name")

      place = Place.query.filter_by(fsq_places_id=fsqPlacesId).first()

      if place:
        print("Place exists, not currently added")
      else:
        place = Place(place_name=placeName, place_recommended_duration=recommendedDuration, fsq_places_id=fsqPlacesId, city_id=city.city_id)
        db.session.add(place)
        db.session.flush()
        print("New place added")

      
      itinerary_item = Itinerary_Item(itinerary_item_id=itemId, start_time=itemStartTime, end_time=itemEndTime, day_id=day.day_id, place_id=place.place_id)
      db.session.add(itinerary_item)
      db.session.flush()
      print("New itinerary item added")



  db.session.commit()
  print("Trip added")

  return jsonify({"msg": "Trip saved"}), 201


@trip_bp.route("/api/trips/<string:tripId>", methods=["DELETE"])
@jwt_required()
def delete_trip(tripId):

  userId = get_jwt_identity()

  trip = Trip.query.filter_by(trip_id=tripId, user_id=userId).first()

  if trip:

    # Delete previous itinerary item info
    day_subquery = db.session.query(Day.day_id).filter_by(trip_id=tripId)
    Itinerary_Item.query.filter(Itinerary_Item.day_id.in_(day_subquery)).delete(synchronize_session=False)

    # Delete provious day info
    Day.query.filter_by(trip_id=tripId).delete()

    db.session.flush()
    db.session.expire_all()

    db.session.delete(trip)
    db.session.commit()

  else:
    return jsonify({"msg": "Trip not found"}), 404


  return jsonify({"msg": "Trip deleted"}), 200


