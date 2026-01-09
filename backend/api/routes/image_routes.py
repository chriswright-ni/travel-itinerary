from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
import requests
import os

image_bp = Blueprint("image_routes", __name__)

load_dotenv()
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")


@image_bp.route("/api/images/search", methods=["GET"])
def get_image():

  location_query = request.args.get("query")

  url = f"https://api.unsplash.com/search/photos"

  print("Location query")
  print(location_query)

  headers = {
    "authorization" : f"Client-ID {UNSPLASH_ACCESS_KEY}"
  }

  params = {
    "query": location_query,
    "orientation": "landscape",
    "per_page": 1
  }
  
  response = requests.get(url, headers=headers, params=params)
  data = response.json()
  image_data = data.get("results")[0]

  image_url = image_data.get("urls").get("regular")

  print(image_url)

  return image_url
