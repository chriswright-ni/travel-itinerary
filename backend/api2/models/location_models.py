from sqlalchemy.sql import func
# from . import db
from api2.extensions import db


class City(db.Model):
  city_id = db.Column(db.Integer, primary_key=True)
  city_name = db.Column(db.String(255))
  country_id = db.Column(db.Integer, db.ForeignKey("country.country_id"), nullable=False)
  places = db.relationship("Place", backref="city")
  trips = db.relationship("Trip", backref="city")

class Country(db.Model):
  country_id = db.Column(db.Integer, primary_key=True)
  country_name = db.Column(db.String(255))
  country_code = db.Column(db.String(2))
  trips = db.relationship("Trip", backref="country")
