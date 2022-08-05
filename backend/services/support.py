import json
from datetime import datetime
from urllib import response

from bson import ObjectId
from db.database import db_connect
import hashlib
from flask import make_response
from flask_jwt_extended import create_access_token, get_jwt_identity

db = db_connect()

def support_question_add(req):
  try:
    email = req['email']
    question = req['question']
    db_col = db['support']
    new_question = {
      "email": email,
      "question": question,
      "create_time": datetime.now()
    }
    db_col.insert_one(new_question)
    response = make_response(json.dumps({'message': 'Success'}), 200)
    return response
  except:
    return make_response(json.dumps({'message': 'Input Error'}), 400)

def support_question_list(req):
  try:
    db_col = db['support']
    questions = list(db_col.find())
    for question in questions:
      question['_id'] = str(question['_id'])
      question['create_time'] = str(question['create_time'])
    return make_response(json.dumps({'question_list': questions}), 200)
  except:
    return make_response(json.dumps({'message': 'Sever Error'}), 404)
  
def support_question_solve(req):
  try:
    db_col = db['support']
    question_id = req['question_id']
    if db_col.delete_one({'_id': ObjectId(question_id)}).deleted_count:
      response = make_response(json.dumps({'message': 'Success'}), 200)
    else:
      response = make_response(json.dumps({'message': 'Server Error'}), 404)
    return response
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 404)