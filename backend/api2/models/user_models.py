# from .. import db
from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

print("TEST2")
print(db)

class User(db.Model):
  user_id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(100), unique=True)
  password = db.Column(db.String(100))
  created_at = db.Column(db.DateTime(timezone=True), default=func.now())