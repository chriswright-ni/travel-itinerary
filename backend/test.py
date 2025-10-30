import requests
import os
from dotenv import load_dotenv

# dotenv_path = find_dotenv()
load_dotenv()

# print("python test file")
PLACES_API_KEY = os.getenv("PLACES_API_KEY")


# url = "https://api.foursquare.com/v3/places/search"
# headers = {
#     "Accept": "application/json",
#     "X-Places-Api-Version": "2025-06-17",
#     "Authorization": os.getenv("PLACES_API_KEY")
# }
# params = {"query": "coffee", "near": "New York", "limit": 5}

# r = requests.get(url, headers=headers)
# print(r.status_code, r.text)


# Base URL for the Places Search API
# url = "https://api.foursquare.com/v3/places/search"
# url = "https://places-api.foursquare.com/places/search"



url = "https://places-api.foursquare.com/places/search"

headers = {
    "accept": "application/json",
    "X-Places-Api-Version": "2025-06-17",
    "authorization": f"Bearer {PLACES_API_KEY}"
}

response = requests.get(url, headers=headers)

print(response.text)