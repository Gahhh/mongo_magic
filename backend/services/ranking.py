
import json
from db.database import db_connect
from flask import make_response

db = db_connect()

def ranking_get_list(req):
  # try:
    db_rank_list = db['rank_list']
    db_score_history = db['score_history']
    db_user = db['users']
    
    result_list = list(db_rank_list.find())
    return_list = []
    for result in result_list:
      if db_score_history.find_one({'_id': result['score_history']}):
        return_list.append(db_score_history.find_one({'_id': result['score_history']}))
    return_list = sorted(return_list, key=lambda x: x['raw_score'], reverse=True)
    pack = {}
    count = 1
    for item in return_list:
      photo = db_user.find_one({'email': item['email']})['photo']
      detail = {
        "location": str(int(item['location']*100)),
        "transport": str(int(item['public_transport']*100)),
        "energy": str(int(item['energy']*100)),
        "Certification": str(int(item['certification/measures']*100)),
      }
      
      pack[str(count)] = {
        "org": item['org'],
        "photo": photo,
        "time": item['test_time'],
        "score": item['raw_score'],
        "detail": detail
      }
      count += 1
  
    return make_response(json.dumps(pack), 200)
  # except:
  #   return make_response(json.dumps({'message': 'No test results yet'}), 404)