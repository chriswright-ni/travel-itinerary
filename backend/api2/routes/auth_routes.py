from flask import Blueprint, jsonify, request
from dotenv import load_dotenv
# from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
import os
from ..models.user_models import User
from api2.models.user_models import db

auth_bp = Blueprint("auth_routes", __name__)


# @auth_bp.route("/api/auth/login", methods=["POST"])
# def login():
#   print("login route")
#   email = request.json.get("email")
#   password = request.json.get("password")
#   user = User.query.filter_by(email=email).first()
#   if user:
#     if password == user.password:
#       access_token = create_access_token(identity=user.user_id)
#     else:
#       return jsonify({"msg": "Password incorrect"}), 401
#   else:
#     return jsonify({"msg": "User does not exist"}), 401
#   return jsonify(access_token=access_token)


@auth_bp.route("/api/auth/logout", methods=["GET"])
def logout():
  print("logout")
  return jsonify({"msg": "Logged out"}), 200
  # return "Hello logout"


@auth_bp.route("/api/auth/createaccount", methods=["POST"])
def createaccount():

  print("create account")

  email = request.json.get("email")
  password = request.json.get("password")
  password_confirm = request.json.get("passwordConfirm")
  print(f"email: {email}")
  print(f"password: {password}")
  print(f"passwordConfirm: {password_confirm}")

  email_exists = User.query.filter_by(email=email).first()
  if email_exists:
    return jsonify({"msg": "User already exists with that email"}), 400
  elif password != password_confirm:
    return jsonify({"msg": "Passwords do not match"}), 400
  else:
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    print("User created")


  return jsonify({"msg": "User created"}), 201
