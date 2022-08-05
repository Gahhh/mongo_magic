from re import I
from db.database import db_connect
from models.calculation.answers import *

def engine(office, data):
  office_suggestion = {
    "Location Location Location":{},
    "Reduce, reuse, recycle":{},
    "Go cloud, go greens":{},
    "Get certified, get ahead":{}
  }
  score_detail = {
    "location": 0,
    "public_transport": 0,
    "energy": 0,
    "certification/measures": 0,
  }
  co2e = 0
  habitat = 0
  total_employee = 0
  total_floor = 0
  total_electricity = 0
  score_list = []
  if office:
    for item in office:
      electricity = 0
      green_energy_percent = 0
      postcode = 0
      score = 0
      for key in item.keys():
        if key == "office_floor_space":
          floor = eval(f"{key}({item[key]})")
        elif key == "office_employee_num":
          employee = eval(f"{key}({item[key]})")
        elif key == "office_elec_percent":
          elec_per = eval(f"{key}({item[key]})")
          green_energy_percent = elec_per[1]
          office_suggestion = get_suggest(elec_per, office_suggestion)
        elif key == "office_elec_amount":
          electricity = eval(f"{key}({item[key]})")
        elif key=="office_postcode":
          general = eval(f"{key}({item[key]})")
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail['location'] = general[1]
          score+=general[1]
        elif key == "public_trans_option":
          general = eval(f"{key}({item[key]})")
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail['public_transport'] = general[1]+4
          score+=general[1]+4
        elif key == "green_star_ans":
          general = eval(f'{key}("{item[key]}")')
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail["certification/measures"] = general[1]+15
          score+=general[1]+15
        elif key == "is_ac_maintained":
          general = eval(f'{key}("{item[key]}")')
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail["certification/measures"] += general[1]
          score+=general[1]
        elif key == "is_ac_smart":
          general = eval(f'{key}("{item[key]}")')
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail["certification/measures"] += general[1]
          score+=general[1]
        elif key == "office_smart":
          general = eval(f'{key}("{item[key]}")')
          office_suggestion = get_suggest(general, office_suggestion)
          score_detail["certification/measures"] += general[1]
          score+=general[1]
      total_employee += employee
      total_floor += floor
      co2e += calculate_co2(electricity, green_energy_percent, postcode)
      habitat += calculate_habitat(co2e)
      total_electricity += electricity
      score_list.append([score,employee])
    energy_result = calculate_avg_energy(total_electricity, total_floor, total_employee)
    office_suggestion = get_suggest(energy_result, office_suggestion)
    avg_energy = energy_result[1]
    energy_score = energy_score_calculate(avg_energy)
    total_score = 0
    for i in score_list:
      scaled = i[0]*(i[1]/total_employee)
      total_score += scaled
  if data:
    data_set = data[0]
    cloud_percentage = 0
    data_score = 0
    for key in data_set.keys():
      if key == "is_data_centre":
        if data_set[key] == "F":
          break
      elif key == "is_cloud":
        temp_result = eval(f'{key}("{data_set[key]}")')
        office_suggestion = get_suggest(temp_result, office_suggestion)
        data_score += temp_result[1]
      elif key == "cloud_percent":
        temp_result = eval(f'{key}("{data_set[key]}")')
        office_suggestion = get_suggest(temp_result, office_suggestion)
        cloud_percentage = temp_result[1]
      elif key == "data_capacity":
        data_capacity = eval(f"{key}({data_set[key]})")
      elif key == "data_elec_percent":
        temp_result = eval(f'{key}("{data_set[key]}")')
        office_suggestion = get_suggest(temp_result, office_suggestion)
        data_green_energy_percent = temp_result[1]
      elif key == "data_elec_amount":
        data_elec_amount = eval(f"{key}({data_set[key]})")
      elif key == "is_data_cool":
        temp_result = eval(f"{key}('{data_set[key]}')")
        office_suggestion = get_suggest(temp_result, office_suggestion)
        data_score += temp_result[1]
      elif key == "nabers_mk":
        temp_result = eval(f"{key}('{data_set[key]}')")
        office_suggestion = get_suggest(temp_result, office_suggestion)
        data_score += temp_result[1]
      elif key == "is_nabers":
        temp_result = eval(f"{key}('{data_set[key]}')")
        office_suggestion = get_suggest(temp_result, office_suggestion)
        data_score += temp_result[1]
    data_energy_temp = calculate_avg_data_energy(data_elec_amount, data_capacity)
    avg_data_energy = data_energy_temp[1]
    office_suggestion = get_suggest(data_energy_temp, office_suggestion)
    co2e += calculate_co2(data_elec_amount,data_green_energy_percent, 9)
    habitat += calculate_habitat(co2e)
    tennis_area = calculate_tennis_area(habitat)
    if cloud_percentage > 0.89:
      data_score = 36
    if avg_data_energy < 2 and data_score < 25:
      data_score += 5
    scaled_data_score = data_score/36
    if scaled_data_score != 0:
      total_score *= scaled_data_score
  score_detail['energy'] = energy_score
  pack = {
    "score": total_score,
     "co2": co2e,
     "natural_habitat": habitat,
     "roughly_size": tennis_area,
     "suggestion": office_suggestion,
     "score_detail": score_detail
  }
  return pack