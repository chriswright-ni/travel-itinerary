from sqlalchemy.sql import func
from . import db


class Place(db.Model):
  place_id = db.Column(db.Integer, primary_key=True)
  fsq_places_id = db.Column(db.String(255))
  place_name = db.Column(db.String(255))
  place_recommended_duration = db.Column(db.Integer)
  place_longitude = db.Column(db.Float)
  place_latitude = db.Column(db.Float)
  city_id = db.Column(db.Integer, db.ForeignKey("city.city_id"), nullable=False)
  itinerary_items = db.relationship("Itinerary_Item", backref="place")
  category_places = db.relationship("Category_Place", backref="place")
