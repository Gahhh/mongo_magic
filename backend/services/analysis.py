import json
from db.database import db_connect
from flask import make_response
import pandas as pd
import datetime
import re
from services.utils import get_dataframe
from cloud.S3_access import get_s3_url

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