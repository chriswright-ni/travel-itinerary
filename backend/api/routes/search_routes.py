from flask import Blueprint, jsonify
from dotenv import load_dotenv
import requests
import os

search_bp = Blueprint("search_routes", __name__)

load_dotenv()
PLACES_API_KEY = os.getenv("PLACES_API_KEY")

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

    for place in place_data:
      print(place.get("name"))

    return jsonify(data)


