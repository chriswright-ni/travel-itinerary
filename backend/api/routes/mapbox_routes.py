from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import requests
import os

# mapbox_bp = Blueprint("mapbox_routes", __name__)

# load_dotenv()
# MAPBOX_ACCESS_TOKEN = os.getenv("MAPBOX_ACCESS_TOKEN")


# @mapbox_bp.route("/api/routing/optimise", methods=["GET"])
# def get_optimised_route():

#   profile = request.args.get("profile")
#   coordinates = request.args.get("coordinates")

#   url = f"https://api.mapbox.com/optimized-trips/v1/mapbox/walking/2.29,48.86;2.31,48.87"

#   print("Profile")
#   print(profile)
#   print("Coordinates")
#   print(coordinates)
#   params = {
#     "access_token": MAPBOX_ACCESS_TOKEN,
#     "geometries": "geojson"
#   }
  
#   response = requests.get(url, params=params)
#   data = response.json()
#   trip_data = data.get("trips")

#   return trip_data
