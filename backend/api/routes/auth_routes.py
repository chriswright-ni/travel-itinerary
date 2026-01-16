from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
import os

auth_bp = Blueprint("auth_routes", __name__)


@auth_bp.route("/api/auth/login", methods=["POST"])
def login():
  email = request.args.get("email")
  password = request.args.get("password")
  return ""


@auth_bp.route("/api/auth/logout", methods=["GET"])
def logout():

  return "test logout"


@auth_bp.route("/api/auth/createaccount", methods=["POST"])
def createaccount():

  email = request.args.get("email")
  password = request.args.get("password")
  password_confirm = request.args.get("passwordConfirm")

  email_exists = User.query.filter_by(email=email).first()
  if email_exists:
    return jsonify({"message": "User already exists with that email"})
  elif password != password_confirm:
    return jsonify({"message": "Passwords do not match"})
  else:
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    print("User created")


  return ""
