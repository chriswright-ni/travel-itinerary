from sqlalchemy.sql import func
# from . import db
from api2.extensions import db


class Trip(db.Model):
  trip_id = db.Column(db.String(36), primary_key=True)
  trip_name = db.Column(db.String(255))
  created_at = db.Column(db.DateTime(timezone=True), default=func.now())
  user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
  start_date = db.Column(db.Date)
  end_date = db.Column(db.Date)
  place = db.Column(db.String(255))
  country_id = db.Column(db.Integer, db.ForeignKey("country.country_id"), nullable=False)
  longitude = db.Column(db.Float)
  latitude = db.Column(db.Float)
  trip_image_url = db.Column(db.String(2083))
  days = db.relationship("Day", backref="trip")

  def to_json(self):
    return {
      "trip_id": self.trip_id,
      "trip_name": self.trip_name,
      "created_at": self.created_at,
      "user_id": self.user_id,
      "start_date": self.start_date.isoformat(),
      "end_date": self.end_date,
      "place": self.place,
      "country_id": self.country_id,
      "longitude": self.longitude,
      "latitude": self.latitude,
      "trip_image_url": self.trip_image_url
    }