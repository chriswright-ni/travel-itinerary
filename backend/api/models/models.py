from api import db
from sqlalchemy.sql import func

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), unique=True)
  password = db.Column(db.String(100))
  created_at = db.Column(db.DateTime(timezone=True), default=func.now())