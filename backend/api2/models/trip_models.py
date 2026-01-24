from sqlalchemy.sql import func
from . import db


class Trip(db.Model):
  trip_id = db.Column(db.String(36), primary_key=True)
  created_at = db.Column(db.DateTime(timezone=True), default=func.now())
  user_id = db.Column(db.Integer, db.ForeignKey("user.user_id"), nullable=False)
  start_date = db.Column(db.Date)
  end_date = db.Column(db.Date)
  place = db.Column(db.String(255))
  country = db.Column(db.String(255))
  country_code = db.Column(db.String(2))
  longitude = db.Column(db.Float)
  latitude = db.Column(db.Float)
  trip_image_url = db.Column(db.String(2083))