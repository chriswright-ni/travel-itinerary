from sqlalchemy.sql import func
from . import db


print("TEST2")
print(db)

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), unique=True, nullable=False)
  password = db.Column(db.String(100), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), default=func.now())
  trips = db.relationship("Trip", backref="user")