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
  user_type = req['user_type']
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
    "create_time": create_time,
    "user_type": user_type
  }
  
  db_col.insert_one(new_user)
  token = create_access_token(identity=email)
  response = make_response({
    "token": token,
    "user_type": user_type
  })
  response.headers['Content-Type'] = 'application/json'
  response.headers['Authorization'] = 'Bearer ' + token
  return response, 200

def user_login(req):
  try:
    email = req['email']
    password = req['password']
    type_in = req['user_type']
    db_col = db['users']

    if not email or not password:
      return make_response(json.dumps({'message': 'Missing required fields'}), 400)
    password_md5 = hashlib.md5(password.encode('utf-8')).hexdigest()
    user = db_col.find_one({'email': email})
    if not user or user['password'] != password_md5: 
      return make_response(json.dumps({'message': 'Invalid email or password'}), 400)
    if user['user_type'] != type_in:
      return make_response(json.dumps({'message': 'Invalid user type'}), 400)
    token = create_access_token(identity=email)
    response = make_response({
      "token": token,
      "user_type": user['user_type']
      })
    response.headers['Content-Type'] = 'application/json'
    response.headers['Authorization'] = 'Bearer ' + token
    return response, 200
  except:
    return make_response(json.dumps({'message': 'Internal Error'}), 500)

def user_get_profile(req):
  identity = get_jwt_identity()
  db_col = db['users']
  user = db_col.find_one({'email': identity})
  response = make_response({"fullname": user['fullname'], "email": user['email'], "org": user['org'], "photo": user['photo']})
  return response, 200

def user_update_profile(req):
  try:
    identity = get_jwt_identity()
    db_col = db['users']
    if not req.keys():
      return make_response(json.dumps({'message': 'Missing required fields'}), 400)
    if 'email' in req.keys() and db_col.find_one({'email': req['email']}):
      return make_response(json.dumps({'message': 'Email already exists'}), 400)
    for key in req.keys():
      db_col.update_one({'email': identity}, {'$set': {key: req[key]}})
    return make_response(json.dumps({'message': 'Profile updated'}), 200)
  except:
    return make_response(json.dumps({'message': 'Internal Error'}), 500)

def user_get_result(req):
  try:
    email = get_jwt_identity()
    db_result = db['score_history']
    result = db_result.find({'email': email}, {'_id': False})
    result = list(result)
    print(result)
    return make_response(json.dumps(result), 200)
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 500)