
state_co2_covert = {
  "2":80,
  "3":110,
  "4":80,
  "5":50,
  "6":70,
  "7":20,
  "0":60,
  "9":50
}

co2e_to_habitat = 13.35

def office_postcode(ans):
  ans = str(ans)
  suggest = "One or more of your offices are located in a state \
    which has a high percentage of electircity generation from fossil fuels.\
      According to Department of Climate Change, Energy, the Environment and Water, \
      Tasmania, South Australia and Northern Territory have the highest percentage of \
        renewable sources of electricity in Australia."
  if ans[0] == '2':
    return [("Location Location Location",suggest), 5]
  elif ans[0] == '3':
    return [("Location Location Location",suggest), 2]
  elif ans[0] == '4':
    return [("Location Location Location",suggest), 5]
  elif ans[0] == '5':
    return [("Location Location Location",""), 8]
  elif ans[0] == '6':
    return [("Location Location Location",""), 6]
  elif ans[0] == '7':
    return [("Location Location Location",""), 10]
  elif ans[0] == '0':
    return [("Location Location Location",""), 7]
  return [("Location Location Location",""), 0]

def is_public_transport(ans):
  suggest = "One or more of your offices have limited public transport access.\
    Every vehicle on the road releases an average of 350g of CO2 per kilometer driven. \
      Compared with driving alone, taking public transportation reduces CO2 emissions by 45%,\
    Travel by public transport instead of cars and planes reduces greenhouse gases which contribute to climate change."
  if ans == "T":
    return [(" ",""), 4]
  return [("Location Location Location",suggest), 0]

def public_trans_option(ans):
  suggest = "One or more of your offices have limited public transport access.\
    Every vehicle on the road releases an average of 350g of CO2 per kilometer driven. \
      Compared with driving alone, taking public transportation reduces CO2 emissions by 45%,\
    Travel by public transport instead of cars and planes reduces greenhouse gases which contribute to climate change."
  result = 4*(len(ans)-1)
  if result < 8:
    return [("Location Location Location",suggest), result]
  return [("Location Location Location",""), result]

def office_floor_space(ans):
  return int(ans)

def office_employee_num(ans):
  return int(ans)

def is_green_star(ans):
  suggest = "One or more of your offices have not been awarded green star rating.\
    Green Star Rating is a nationally recognised standard for the performance of \
      energy efficiency and environmental sustainability. A Green Star-certified building \
      can 1) lower operating costs, 2) use 66% less electricity than average Australian city buildings, \
        3) Produce 62% fewer greenhouse gas emissions than average Australian buildings. "
  if ans == "T":
    return [(" ",""), 15]
  return [("Get certified, get ahead",suggest), 15]

def green_star_ans(ans):
  if ans == "4 Stars":
    return [(" ",""), 5]
  elif ans == "5 Stars":
    return [(" ",""), 10]
  elif ans == "6 Stars":
    return [(" ",""), 15]

def is_ac_maintained(ans):
  if ans == "T":
    return [(" ",""), 10]
  return [(" ",""), 0]

def is_ac_smart(ans):
  if ans == "T":
    return [(" ",""), 10]
  return [(" ",""), 0]

def office_elec_amount(ans):
  return int(ans)

def office_elec_percent(ans):
  suggest = "One or more of your offices have a lower renewable electricity percentage than the average.\
    you may consult with your energy supplier for more infromation on your electricity supply and renewable energy percentage."
  result = int(ans)/100
  if result < 0.23:
    return [("Reduce, reuse, recycle",suggest), result]
  return [(" ",""), result]

def office_led(ans):
  suggest = "One or more of your offices have not installed LED lighting systems.\
    Lighting takes roughly 25% of the energy usage in an office. Changing to LED lighting \
      will significantly reduce the energy usage of your office, and more the lifetime of LED lighting \
        is longer than the lifetime of traditional lighting."
  if ans == "T":
    return [(" ",""), 5]
  return [("Reduce, reuse, recycle",suggest), 0]

def office_smart(ans):
  if ans == "T":
    return [(" ",""), 5]
  return [(" ",""), 0]

def data_capacity(ans):
  return int(ans)

def is_nabers(ans):
  suggest = "You may consider to get certified for your data centre with NABERS rating system. \
  NABERS is a national rating system \
    that measures the environmental performance of \
      Australian buildings and tenancies."
  if ans == "T":
    return [(" ",""), 5]
  return [("Get certified, get ahead",suggest), 0]

def nabers_mk(ans):
  result = int(ans[0])
  suggest = "Your NABERS score is relatively low.\
    Consult with a NABERS assessor for more information on how to improve your NABERS score."
  if result < 3:
    return [("Get certified, get ahead", suggest), result]
  return [(" ",""), result]

def data_elec_amount(ans):
  return int(ans)

def data_elec_percent(ans):
  suggest = "Your data centre have a lower renewable electricity percentage than the average.\
    you may consult with your energy supplier for\
      more infromation on your electricity supply and renewable energy percentage."
  result = int(ans)/100
  if result < 0.23:
    return [("Reduce, reuse, recycle",suggest), result]
  return [(" ",""), result]

def is_data_cool(ans):
  suggest = "Your data centre does not have a passive cooling system.\
    a passive cooling system could significantly reduce the energy usage of your data centre as \
      well as the greenhouse gas emissions."
  if ans == "T":
    return [(" ",""), 10]
  return [("Reduce, reuse, recycle",suggest), 0]

def is_cloud(ans):
  suggest = "Your organisation does not have any servers on the cloud, \
    it is recommended that you consider cloud solutions for your data centre. \
      Cloud solutions have many advantages, including: 1) Power efficiency, \
        2) Cost efficiency, 3) Security, 4) sustainability. Generally, the cloud infrastructure is\
          3.6 times more energy efficient than the median of enterprise data centers (Source: AWS Sustainability).\
            and it can lower the workload carbon footprints by 80% compared to the enerprise data centres."
  if ans == "T":
    return [(" ", ""), 10]
  return [("Go cloud, go greens", suggest), 0]

def calculate_co2(electricity, green_energy_percent, postcode):
  elec_eff = (electricity * (1-green_energy_percent))/100
  ans = str(postcode)
  return elec_eff * state_co2_covert[ans[0]]

def calculate_habitat(co2e):
  return co2e / co2e_to_habitat

def cloud_percent(ans):
  suggest = "Your organisation has a low percentage of servers on the cloud, \
    think about moving more services to the cloud to reduce your carbon footprint. "
  result = int(ans)/100
  if result < 0.5:
    return [("Go cloud, go greens",suggest), result]
  return [(" ",""), result]



def calculate_avg_energy(total_electricity, total_floor, employee):
  result = total_electricity/total_floor/employee
  suggest = "Your total electricity consumption is higher than the average.\
    The average electricity consumption for an office in Australia is around 5.7kWh/yr/m2/person."
  if result > 7.5:
    return [("Reduce, reuse, recycle", suggest), result]
  return [(" ",""), result]

def get_suggest(result, office_suggestion):
  if result[0][1] != "":
    temp_set = set(office_suggestion[result[0][0]])
    temp_set.add(result[0][1])
    office_suggestion[result[0][0]] = temp_set
  return office_suggestion

def calculate_avg_data_energy(data_elec_amount, data_capacity):
  suggest = "Your data centre has a higher electricity consumption than the average.\
    Generally, for every 100w of power used for server, it requires 50-100w to cool it."
  result = data_elec_amount/(data_capacity*3)/24/365
  if result > 2:
    return [("Reduce, reuse, recycle", suggest), result]
  return [(" ",""), result]

def energy_score_calculate(avg_energy):
  if avg_energy <= 3.5:
    return 40
  if 3.5 < avg_energy <= 7.5:
    return (7.5-avg_energy)*5+20
  if 7.5 < avg_energy <= 17.5:
    return (17.5-avg_energy)*2
  return 0
  
def calculate_tennis_area(habitat):
  return habitat/223

def score_percent_process(score_pack):
  for key in score_pack.keys():
    if key == "location":
      score_pack[key] = score_pack[key]/10
    elif key == 'public_transport':
      score_pack[key] = score_pack[key]/20
    elif key == 'energy':
      score_pack[key] = score_pack[key]/40
    elif key == 'certification/measures':
      score_pack[key] = score_pack[key]/30
  return score_pack