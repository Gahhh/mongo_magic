import requests
import pandas as pd
import re

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

def get_dataframe(data_list):
  df = pd.json_normalize(data_list)
  list_rebuild = list(df.columns)
  for i in range(len(list_rebuild)):
    list_rebuild[i] = re.sub(r'analysis_data.', '', list_rebuild[i])
  df.columns = list_rebuild
  return df