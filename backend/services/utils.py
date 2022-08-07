import requests

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

  