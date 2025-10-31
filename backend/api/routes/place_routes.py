from flask import Blueprint
import requests
import os


@app.route("/search", methods=["GET"])
    def search():
        url = "https://places-api.foursquare.com/places/search"

        headers = {
            "accept": "application/json",
            "X-Places-Api-Version": "2025-06-17",
            "Authorization": f"Bearer {PLACES_API_KEY}"
        }
        params = {"ll": "54.4203,-6.4548", "radius": 5000}

        response = requests.get(url, headers=headers, params=params)
        data = response.json()

        return jsonify(data)

