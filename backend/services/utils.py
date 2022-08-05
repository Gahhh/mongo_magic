import requests
from services.config import get_recatcha_token

url = 'https://www.google.com/recaptcha/api/siteverify'
def get_approval(public_token):
  try:
    private_token = get_recatcha_token()
    result = requests.post(url, data={'secret': private_token, 'response': public_token})
    return result.json()["success"]
  except:
    return False

def data_process(office_list, question_set):
  answer_list = []
  for office in office_list:
    answer_set = {}
    for key in office.keys():
      question = question_set[key]['score_method']
      answer = office[key]
      answer_set[question] = answer
    answer_list.append(answer_set)
  return answer_list

  