import requests
import os
from dotenv import load_dotenv
import googlemaps

# dotenv_path = find_dotenv()
load_dotenv()

# print("python test file")
PLACES_API_KEY = os.getenv("PLACES_API_KEY")
# API_KEY = os.getenv("PLACES_API_KEY")

# gmaps = googlemaps.Client(key=PLACES_API_KEY)

# places = gmaps.places_nearby(
#     location=(54.4471, -6.3870),
#     # location=(40.7128, -74.0060), 
#     # location=(53.3498, -6.2603),
#     radius=5000,                 
#     type="restaurant"
# )

# for place in places["results"]:
#     print(place["name"], "-", place["vicinity"])

# url = "https://api.foursquare.com/v3/places/search"
# headers = {
#     "Accept": "application/json",
#     "X-Places-Api-Version": "2025-06-17",
#     "Authorization": os.getenv("PLACES_API_KEY")
# }
# params = {"query": "coffee", "near": "New York", "limit": 5}

# r = requests.get(url, headers=headers)
# print(r.status_code, r.text)




url = "https://places-api.foursquare.com/places/search"

headers = {
    "accept": "application/json",
    "X-Places-Api-Version": "2025-06-17",
    "authorization": f"Bearer {PLACES_API_KEY}"
}

params = {"query": "coffee", "ll": "54.4471,-6.3870", "limit": 5}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print(data)