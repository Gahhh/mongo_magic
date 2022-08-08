from audioop import avg
import json
from db.database import db_connect
from flask import make_response
import pandas as pd
import datetime
from services.utils import get_dataframe
from cloud.S3_access import get_s3_url
from flask_jwt_extended import get_jwt_identity
import numpy as np

db = db_connect()
def analysis_data(req):
  try:
    db_analysis = db['analysis_data']
    
    start = req['dateStart']
    end = req['dateEnd']
    start = datetime.datetime.strptime(start, '%d/%m/%Y')
    end = datetime.datetime.strptime(end, '%d/%m/%Y')
    types = req['types']
    data_list = list(db_analysis.find({}, {'_id': 0}))
    df = get_dataframe(data_list)
    return_df = pd.DataFrame()
    return_df['org'] = df['org']
    for type in types:
      return_df[type] = df[type]
    url = get_s3_url(return_df)
    if url == "Error":
      return make_response(json.dumps({'message': 'AWS S3 bucket error'}), 500)
    
    return make_response(json.dumps({'url': url}), 200)
  except:
    return make_response(json.dumps({'message': 'Input Error'}), 400)
  
def diagram_data(req):
  try:
    db_result = db['score_history']
    email = get_jwt_identity()
    result = list(db_result.find({'email': email}, {'_id': 0}))
    result = sorted(result, key=lambda x: x['test_time'], reverse=True)
    result = result[:10]
    return make_response(json.dumps({'result': result}), 200)
  except:
    return make_response(json.dumps({'message': 'Server Error'}), 500)


def stats_data(req):
  db_user = db['users']
  db_results = db['results']
  db_score_rank = db['scores_rank']
  db_socre_history = db['score_history']
  user_total = len(list(db_user.find({'user_type': '1'}, {'_id': 0})))
  result_total = len(list(db_results.find({}, {'_id': 0})))
  try:
    rank_list = db_score_rank.find({}, {'_id': 0})[0]['list']
    avg_score = int(np.mean(rank_list))
  except:
    avg_score = 0
  
  history_list = list(db_socre_history.find({}, {'_id': 0}))
  location = 0
  energy = 0
  pt = 0
  ct = 0
  if len(history_list) > 0:
    for history in history_list:
      location += history['location']
      energy += history['energy']
      pt += history['public_transport']
      ct += history['certification/measures']
  else:
    history_list.append(1)
  avg_location = int(location / len(history_list) * 100)
  avg_energy = int(energy / len(history_list) *100)
  avg_pt = int(pt / len(history_list)*100)
  avg_ct = int(ct / len(history_list)*100)
  pack = {
    'user_total': user_total,
    'result_total': result_total,
    'avg_score': avg_score,
    'avg_location': avg_location,
    'avg_energy': avg_energy,
    'avg_pt': avg_pt,
    'avg_ct': avg_ct
  }
  return make_response(json.dumps(pack), 200)