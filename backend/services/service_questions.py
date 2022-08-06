from audioop import reverse
import email
from gettext import find
import json
from datetime import datetime
from bson import ObjectId
import re
import jwt
from db.database import db_connect
import hashlib
from flask import make_response
from flask_jwt_extended import create_access_token, get_jwt_identity
from services.utils import data_process
from models.calculation.engine import engine

db = db_connect()

def question_add(req):
  try:
    title = req['title']
    content = req['content']
    option = req['option']
    score_method = req['score_method']
    mutiable = req['mutiable']
    question_type = req['question_type']
    depend = req['depend']
    unit = req['unit']
    db_col = db['questions']
    new_question = {
      "title": title,
      "content": content,
      "option": option,
      "question_type": question_type,
      "score_method": score_method,
      "mutiable": mutiable,
      "depend": depend,
      "unit": unit,
    }
    id = db_col.insert_one(new_question).inserted_id
    return make_response(json.dumps({'q_id': str(id)}), 200)
  except Exception:
    return make_response(json.dumps({'message': 'Input Error'}), 400)
  
def question_list(req):
  try:
    db_col = db['questions']
    questions = list(db_col.find())
    for question in questions:
      question['_id'] = str(question['_id'])
    return make_response(json.dumps({'question_list': questions}), 200)
  except Exception:
    return make_response(json.dumps({'message': 'Server Error'}), 500)

def question_temp_save(req):
  try:
    db_col = db['questions_cache']
    email = get_jwt_identity()
    pack = {
      "email": email,
      "metadata": req,
      "count": 0
    }
    db_col.insert_one(pack)
    return make_response(json.dumps({'message': 'success saved'}), 200)
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 500)

def question_temp_load(req):
  try:
    email = get_jwt_identity()
    pack = db['questions_cache'].find_one({'email': email})
    if pack:
      if pack['count'] < 1:
        pack['count'] += 1
        db['questions_cache'].update_one({'email': email}, {'$set': pack})
        return make_response(json.dumps({'metadata': pack['metadata']}), 200)
      db['questions_cache'].delete_one({'email': email})
      return make_response(json.dumps({ email: pack['metadata']}), 200)
    else:
      return make_response(json.dumps({'message': 'Does not find data'}), 404)
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 500)

def question_answer(req):
  try:
    ans_pack = req
    db_col = db['results']
    db_score = db['score_history']
    db_user = db['users']
    db_score_rank = db['scores_rank']


    office_list = []
    data_list = []
    question_list = db['questions'].find()
    question_set = {}

    for question in question_list:
      question_set[str(question['_id'])] = question
      
    for ans in ans_pack.keys():
      if re.search(r'^office', ans):
        office_list.append(ans_pack[ans])
      if re.search(r'^data', ans):
        data_list.append(ans_pack[ans])
    office_data = data_process(office_list, question_set)
    data_centre_data = data_process(data_list, question_set)[0]

    if data_centre_data["is_data_centre"] == "F":
      data_centre_data = {}
    result = engine(office_data, data_centre_data)
    time_now = str(datetime.now())
    score_detail = result['score_detail']
    score_detail['test_time'] = time_now
    result.pop('score_detail')
    result["test_time"] = time_now

    for key in result['suggestion'].keys():
      temp_set = result['suggestion'][key]
      result['suggestion'][key] = list(temp_set)

    email = get_jwt_identity()
    score_detail['email'] = email
    score_detail['raw_score'] = result['score']

    score_list = list(db_score_rank.find_one({'_id': 'rank'})['list'])
    score_list.append(result['score'])
    score_list = sorted(score_list,reverse=True)
    position = score_list.index(result['score']) / len(score_list) * 100
    result['position'] = position
    db_score_rank.update_one({'_id': "rank"}, {'$set': {'list': score_list}})

    org = db_user.find_one({'email': email})['org']
    score_detail['org'] = org
    result['org'] = org
    data_id = db_col.insert_one(result).inserted_id
    score_detail['test_id'] = str(data_id)
    db_score.insert_one(score_detail)
    
    return make_response(json.dumps({'result_id': str(data_id)}), 200)
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 500)

def question_get_result(result_id):
  try:
    result = db['results'].find_one({'_id': ObjectId(result_id)})
    result['_id'] = str(result['_id'])
    return make_response(json.dumps(result), 200)
  except:
    return make_response(json.dumps({'message': 'Result not found'}), 404)