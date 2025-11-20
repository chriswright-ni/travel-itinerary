from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import requests
import os

search_bp = Blueprint("search_routes", __name__)

# Text added for github commit test

load_dotenv()
PLACES_API_KEY = os.getenv("PLACES_API_KEY")
MAPBOX_ACCESS_TOKEN = os.getenv("MAPBOX_ACCESS_TOKEN")

# This route uses Mapbox search API to return a list of locations based on the users search
@search_bp.route("/api/location/suggest", methods=["GET"])
def suggest():
  print("inside suggest route")
  search_text = request.args.get("q")
  session_token = "test_session"

  url = "https://api.mapbox.com/search/searchbox/v1/suggest"
  params = {
    "q": search_text,
    "session_token": session_token,
    "access_token": MAPBOX_ACCESS_TOKEN,
    "types": "city,region,place,district",
    "limit": 10,
    "language": "en"
  }

  response = requests.get(url, params=params)
  print(response)
  data = response.json()

  suggestions = data.get("suggestions")
  searchItems = []

  for suggestion in suggestions:
    searchItem = {
      "mapbox_id": suggestion.get("mapbox_id"),
      "place_name": suggestion.get("name"),
      "place_formatted": suggestion.get("place_formatted"),
    }

    searchItems.append(searchItem)

  return jsonify(searchItems)

# This route uses Mapbox search API to obtain detailed location data
# The location name and coordinates are returned
@search_bp.route("/api/location/retrieve", methods=["GET"])
def retrieve():
  print("inside retrieve route")
  id = request.args.get("id")
  session_token = "test_session"

  url = f"https://api.mapbox.com/search/searchbox/v1/retrieve/{id}"
  
  params = {
    "session_token": session_token,
    "access_token": MAPBOX_ACCESS_TOKEN,
    
  }

  response = requests.get(url, params=params)
  print(response)
  data = response.json()

  features = data.get("features") 
  name = features[0].get("properties").get("full_address") 
  latitude = features[0].get("properties").get("coordinates").get("latitude") 
  longitude = features[0].get("properties").get("coordinates").get("longitude") 
  
  location_data = {
    "name": name,
    "latitude": latitude,
    "longitude": longitude,
  }

  return location_data


@search_bp.route("/hello", methods=["GET"])
def hello():
  return "Hello World"

@search_bp.route("/search", methods=["GET"])
def search():
    url = "https://places-api.foursquare.com/places/search"

    headers = {
        "accept": "application/json",
        "X-Places-Api-Version": "2025-06-17",
        "Authorization": f"Bearer {PLACES_API_KEY}"
    }
    params = {"query": "cafe", "ll": "54.4203,-6.4548", "radius": 5000, "limit": 50} # FSQ places result limit is 50, unless pagination is used

    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    place_data = data.get("results", []) # The second argument, [], is the default value if the get method produces a type error


    # The results data from the Foursquare Places API is an array of objects
    # Cleaning the data to remove unnecessary fields - creating a smaller array of objects
    places = []
    for i, place in enumerate(place_data):
      place_cleaned = {
        "id": i + 1,
        "name": place.get("name")
      }
      print(place.get("name"))
      places.append(place_cleaned);

    return jsonify(places)


@search_bp.route("/places", methods=["GET"])
def get_places():

    # Get interest category from query string
    interest_category = request.args.get("interestCategory")
    latitude = float(request.args.get("latitude"))
    longitude = float(request.args.get("longitude"))
    ll = f"{latitude:.4f},{longitude:.4f}"
    

    if not interest_category:
      print("No interest category selected") # Update this

    url = "https://places-api.foursquare.com/places/search"

    headers = {
        "accept": "application/json",
        "X-Places-Api-Version": "2025-06-17",
        "Authorization": f"Bearer {PLACES_API_KEY}"
    }
    print(ll)
    # params = {f"query": {interest_category}, "ll": "54.4203,-6.4548", "radius": 5000, "limit": 50} # FSQ places result limit is 50, unless pagination is used
    params = {f"query": {interest_category}, "ll": {ll}, "radius": 5000, "limit": 50} # FSQ places result limit is 50, unless pagination is used
    
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    place_data = data.get("results", []) # The second argument, [], is the default value if the get method produces a type error
    print(f"Finding places with interest category: {interest_category}")

    # The results data from the Foursquare Places API is an array of objects
    # Cleaning the data to remove unnecessary fields - creating a smaller array of objects
    places = []
    for i, place in enumerate(place_data):
      place_cleaned = {
        "id": i + 1,
        "name": place.get("name")
      }
      print(place.get("name"))
      places.append(place_cleaned);

    return jsonify(places)

