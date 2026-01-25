from sqlalchemy.sql import func
# from . import db
from api2.extensions import db


class Category(db.Model):
  category_id = db.Column(db.Integer, primary_key=True)
  category_name = db.Column(db.String(255))
  category_places = db.relationship("Category_Place", backref="category")
  

class Category_Place(db.Model):
  category_place_id = db.Column(db.Integer, primary_key=True)
  category_id = db.Column(db.Integer, db.ForeignKey("category.category_id"), nullable=False)
  place_id = db.Column(db.Integer, db.ForeignKey("place.place_id"), nullable=False)
