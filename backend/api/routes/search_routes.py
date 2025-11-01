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


    # The results data from thr Foursquare Places API is an array of objects
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


# @search_bp.route("/search", methods=["GET"])
# def search():
#     data = {
#       "places": [
#         {
#           "id": 1,
#           "name": "Central Park",
#           "location": "New York City, USA",
#           "description": "A large public park in Manhattan known for its scenic landscapes, walking paths, and cultural landmarks."
#         },
#         {
#           "id": 2,
#           "name": "Eiffel Tower",
#           "location": "Paris, France",
#           "description": "An iconic iron tower built in 1889, offering panoramic views of Paris and a symbol of French culture."
#         },
#         {
#           "id": 3,
#           "name": "Mount Fuji",
#           "location": "Honshu, Japan",
#           "description": "Japan’s tallest mountain and a sacred symbol, popular for hiking and photography."
#         },
#         {
#           "id": 4,
#           "name": "Santorini",
#           "location": "Cyclades Islands, Greece",
#           "description": "A volcanic island known for its whitewashed buildings, blue-domed churches, and beautiful sunsets."
#         },
#         {
#           "id": 5,
#           "name": "Machu Picchu",
#           "location": "Cusco Region, Peru",
#           "description": "An ancient Incan city set high in the Andes Mountains, renowned for its archaeological significance and breathtaking views."
#         }
#       ]
# }

#     return jsonify(data)
