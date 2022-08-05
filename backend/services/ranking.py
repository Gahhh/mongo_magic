import email
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

def ranking_get_list(req):
  time = str(datetime.now())
  pack={
    "1": {
      "org":"UNSW0",
      "photo":"https://www.unsw.edu.au/content/dam/images/graphics/logos/unsw/unsw_0.png",
      "time": time,
      "score": "99",
      "detail": {
        "location": "40",
        "transport": "50",
        "energy": "60",
        "Certification": "70"
      }
    },
    "2": {
      "org":"UNSW1",
      "photo":"https://www.unsw.edu.au/content/dam/images/graphics/logos/unsw/unsw_0.png",
      "time": time,
      "score": "98",
      "detail": {
        "location": "40",
        "transport": "50",
        "energy": "60",
        "Certification": "70"
      }
    },
    "3": {
      "org":"UNSW2",
      "photo":"https://www.unsw.edu.au/content/dam/images/graphics/logos/unsw/unsw_0.png",
      "time": time,
      "score": "93",
      "detail": {
        "location": "40",
        "transport": "50",
        "energy": "60",
        "Certification": "70"
      }
    },
    "4": {
      "org":"UNSW3",
      "photo":"https://www.unsw.edu.au/content/dam/images/graphics/logos/unsw/unsw_0.png",
      "time": time,
      "score": "93",
      "detail": {
        "location": "40",
        "transport": "50",
        "energy": "60",
        "Certification": "70"
      }
    },
    "5": {
      "org":"UNSW5",
      "photo":"https://www.unsw.edu.au/content/dam/images/graphics/logos/unsw/unsw_0.png",
      "time": time,
      "score": "90",
      "detail": {
        "location": "40",
        "transport": "50",
        "energy": "60",
        "Certification": "70"
      }
    }
  }
  return make_response(json.dumps(pack), 200)