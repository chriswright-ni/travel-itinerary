from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
# from ..interest_categories import INTEREST_CATEGORY_ICONS
import requests
import os
import uuid

search_bp = Blueprint("search_routes", __name__)

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
    "types": "city,region,place,district,address",
    "limit": 10,
    "language": "en"
  }

  response = requests.get(url, params=params)
  print(response)
  data = response.json()

  suggestions = data.get("suggestions")
  searchItems = []

  for suggestion in suggestions:
    place_name = suggestion.get("name")
    if "airport" not in place_name.lower():
      searchItem = {
        "mapbox_id": suggestion.get("mapbox_id"),
        "place_name": place_name,
        "place_formatted": suggestion.get("place_formatted"),
      }
      searchItems.append(searchItem)
    else:
      continue

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
  country = features[0].get("properties").get("context").get("country").get("name")
  place = features[0].get("properties").get("context").get("place").get("name")
  country_code =  features[0].get("properties").get("context").get("country").get("country_code")
  
  
  location_data = {
    "name": name,
    "country": country,
    "country_code": country_code,
    "place": place,
    "latitude": latitude,
    "longitude": longitude,
  }

  return location_data



@search_bp.route("/hello", methods=["GET"])
def hello():
  return "hello world"


@search_bp.route("/places", methods=["GET"])
def get_places():

  print("In place search")

  # Get interest category from query string
  # interest_category = request.args.get("interestCategory")
  interest_category = "Landmarks"
  # latitude = float(request.args.get("latitude"))
  latitude = 48.8584
  # longitude = float(request.args.get("longitude"))
  longitude = 2.2945
  ll = f"{latitude:.4f},{longitude:.4f}"
  
  # foursquare_categories = INTEREST_CATEGORIES.get(interest_category)

  # print(foursquare_categories)


  

  if not interest_category:
    print("No interest category selected") # Update this

  url = "https://places-api.foursquare.com/places/search"

  headers = {
      "accept": "application/json",
      "X-Places-Api-Version": "2025-06-17",
      "Authorization": f"Bearer {PLACES_API_KEY}"
  }
  # print(ll)

  params = {f"query": {interest_category}, "ll": {ll}, "radius": 3000, "limit": 10, "sort": "RATING"}
  # params = {"categories": ",".join(foursquare_categories), "ll": ll, "radius": 5000, "limit": 50} 
  # params = {
  #   "fsq_category_ids": "4bf58dd8d48988d12d941735",
  #   "ll": ll,
  #   "radius": 5300,
  #   "limit": 10,
  #   "sort": "DISTANCE",
  #   } 
  # params = {"ll": ll, "radius": 5000, "limit": 50} 
  # print(params)
  response = requests.get(url, headers=headers, params=params)
  data = response.json()
  place_data = data.get("results", []) # The second argument, [], is the default value if the get method produces a type error
  # print(place_data)
  print(f"Finding places with interest category: {interest_category}")
  # The results data from the Foursquare Places API is an array of objects
  # Cleaning the data to remove unnecessary fields - creating a smaller array of objects
  places = []
  for i, place in enumerate(place_data):
    categories = place.get("categories", [])
    
    if categories:
      category_name = categories[0].get("name")
    else:
      category_name = "Unknown"
    
    place_cleaned = {
      # "id": i + 1,
      # "id": str(uuid.uuid4()),
      "id": place.get("fsq_place_id"),
      "name": place.get("name"),
      "category": category_name,
      "distance": place.get("distance"),
      # "fsqPlaceId": place.get("fsq_place_id"),
      "orderId": i + 1
    }

    if i == 0:
      
      details_url = f"https://places-api.foursquare.com/places/{place.get("fsq_place_id")}"
      details_params = {"fields": "rating,description,photos,stats,hours"}
      
      details_response = requests.get(details_url, headers=headers, params=details_params)
      print("Premium endpoint called")

      details_data = details_response.json()

      # print("Details data:")
      # print(details_data)

      stats = details_data.get("stats")
      if stats:
        total_ratings = stats.get("total_ratings")
      else:
        total_ratings = None 

      hours = details_data.get("hours")
      if hours:
        open_now = hours.get("open_now")
      else:
        open_now = None

      photos = details_data.get("photos")
      if photos:
        prefix = photos[0].get("prefix")
        suffix = photos[0].get("suffix")
        width = photos[0].get("width")
        height = photos[0].get("height")

      image_url = f"{prefix}{width}x{height}{suffix}"

      description = details_data.get("description")

      print("image url:")
      print(image_url)

      place_cleaned["rating"] = details_data.get("rating")
      place_cleaned["description"] = details_data.get("description")
      place_cleaned["totalRatings"] = total_ratings
      place_cleaned["imageUrl"] = image_url
      place_cleaned["openNow"] = image_url


    # print(place_cleaned.get("category"))
    places.append(place_cleaned);
    # print(places)

  return jsonify(places)
  # return jsonify(place_data)


@search_bp.route("/places/id", methods=["GET"])
def get_place_details():

  fsq_place_id="51a2445e5019c80b56934c75"

  url = f"https://places-api.foursquare.com/places/{fsq_place_id}"

  headers = {
      "accept": "application/json",
      "X-Places-Api-Version": "2025-06-17",
      "Authorization": f"Bearer {PLACES_API_KEY}"
  }

  params = {"fields": "rating,description,photos"}
  # print(ll)

  # params = {f"query": {interest_category}, "ll": {ll}, "radius": 5000, "limit": 50, "sort": "RATING"}

  response = requests.get(url, headers=headers, params=params)
  data = response.json()
  # place_data = data.get("photos")
  print("Place details:")
  print(data)

  return jsonify(data)