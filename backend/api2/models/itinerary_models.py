from sqlalchemy.sql import func
from . import db


class Day(db.Model):
  day_id = db.Column(db.Integer, primary_key=True)
  day_number = db.Column(db.Integer)
  date = db.Column(db.Date)
  start_time = db.Column(db.Time)
  start_longitude = db.Column(db.Float)
  start_latitude = db.Column(db.Float)
  start_location_name = db.Column(db.String(255))
  trip_id = db.Column(db.String(36), db.ForeignKey("trip.trip_id"), nullable=False)
  itinerary_items = db.relationship("Itinerary_Item", backref="day")


class Itinerary_Item(db.Model):
  itinerary_item_id = db.Column(db.Integer, primary_key=True)
  start_time = db.Column(db.Time)
  end_time = db.Column(db.Time)
  order_number = db.Column(db.Integer)
  day_id = db.Column(db.Integer, db.ForeignKey("day.day_id"), nullable=False)
  place_id = db.Column(db.Integer, db.ForeignKey("place.place_id"), nullable=False)

  