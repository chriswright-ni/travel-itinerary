from sqlalchemy.sql import func
# from . import db
from api2.extensions import db


class Day(db.Model):
  day_id = db.Column(db.Integer, primary_key=True)
  day_number = db.Column(db.Integer)
  date = db.Column(db.Date) # Date field probably isn't need - confirm this
  start_time = db.Column(db.Time)
  start_longitude = db.Column(db.Float)
  start_latitude = db.Column(db.Float)
  start_location_name = db.Column(db.String(255))
  trip_id = db.Column(db.String(36), db.ForeignKey("trip.trip_id"), nullable=False)
  itinerary_items = db.relationship("Itinerary_Item", backref="day")

  def to_json(self):
    return {
      "day_id": self.day_id,
      "day_number": self.day_number,
      "start_time": self.start_time.strftime("%H:%M") if self.start_time else None,
      "start_longitude": self.start_longitude,
      "start_latitude": self.start_latitude,
      "start_location_name": self.start_location_name,
      "itinerary_items": [itinerary_item.to_json() for itinerary_item in self.itinerary_items]
     
    }


class Itinerary_Item(db.Model):
  itinerary_item_id = db.Column(db.Integer, primary_key=True)
  start_time = db.Column(db.Time)
  end_time = db.Column(db.Time)
  order_number = db.Column(db.Integer)
  day_id = db.Column(db.Integer, db.ForeignKey("day.day_id"), nullable=False)
  place_id = db.Column(db.Integer, db.ForeignKey("place.place_id"), nullable=False)

  def to_json(self):
    return {
      "itinerary_item_id": self.itinerary_item_id,
      "start_time": self.start_time.strftime("%H:%M") if self.start_time else None,
      "end_time": self.end_time.strftime("%H:%M") if self.end_time else None,
      "place_name": self.place.place_name,
      "place_recommended_duration": self.place.place_recommended_duration,
    
    }