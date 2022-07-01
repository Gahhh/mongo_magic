import json
from datetime import datetime
from db.database import db_connect
import hashlib
from flask import make_response
from flask_jwt_extended import create_access_token, get_jwt_identity

db = db_connect()

def user_register(req):
  fullname = req['fullname']
  password = req['password']
  email = req['email']
  org = req['org']
  create_time = datetime.now()
  db_col = db['users']
  
  if db_col.find_one({'email': email}):
    return make_response(json.dumps({'message': 'Email already exists'}), 400)
  
  if not fullname or not password or not email or not org:
    return make_response(json.dumps({'message': 'Missing required fields'}), 400)
  
  password_md5 = hashlib.md5(password.encode('utf-8')).hexdigest()
  new_user = {
    "fullname": fullname,
    "password": password_md5,
    "email": email,
    "org": org,
    "photo": "",
    "create_time": create_time
  }
  
  db_col.insert_one(new_user)
  token = create_access_token(identity=email)
  response = make_response({"token": token})
  response.headers['Content-Type'] = 'application/json'
  response.headers['Authorization'] = 'Bearer ' + token
  return response, 200

def user_login(req):
  email = req['email']
  password = req['password']
  db_col = db['users']
  if not email or not password:
    return make_response(json.dumps({'message': 'Missing required fields'}), 400)
  password_md5 = hashlib.md5(password.encode('utf-8')).hexdigest()
  user = db_col.find_one({'email': email})
  if not user or user['password'] != password_md5: 
    return make_response(json.dumps({'message': 'Invalid email or password'}), 400)
  token = create_access_token(identity=email)
  response = make_response({"token": token})
  response.headers['Content-Type'] = 'application/json'
  response.headers['Authorization'] = 'Bearer ' + token
  return response, 200

def user_get_profile(req):
  identity = get_jwt_identity()
  db_col = db['users']
  user = db_col.find_one({'email': identity})
  response = make_response({"fullname": user['fullname'], "email": user['email'], "org": user['org'], "photo": user['photo']})
  return response, 200

def user_update_profile(req):
  identity = get_jwt_identity()
  db_col = db['users']
  user = db_col.find_one({'email': identity})
  return "success"