
state_co2_covert = {
  "2":80,
  "3":110,
  "4":80,
  "5":50,
  "6":70,
  "7":20,
  "0":60
}

co2e_to_habitat = 13.35

def office_postcode(ans):
  ans = str(ans)
  if ans[0] == '2':
    return 5
  elif ans[0] == '3':
    return 2
  elif ans[0] == '4':
    return 5
  elif ans[0] == '5':
    return 8
  elif ans[0] == '6':
    return 6
  elif ans[0] == '7':
    return 10
  elif ans[0] == '0':
    return 7
  return 0

def is_public_transport(ans):
  if ans == "T":
    return 4
  return 0

def public_trans_option(ans):
  return 4*(len(ans)-1)

def office_floor_space(ans):
  return int(ans)

def office_employee_num(ans):
  return int(ans)

def is_green_star(ans):
  if ans == "T":
    return 15
  return 0

def green_star_ans(ans):
  if ans == "4 Stars":
    return 5
  elif ans == "5 Stars":
    return 10
  elif ans == "6 Stars":
    return 15

def is_ac_maintained(ans):
  if ans == "T":
    return 10
  return 0

def is_ac_smart(ans):
  if ans == "T":
    return 10
  return 

def office_elec_amount(ans):
  return int(ans)

def office_elec_percent(ans):
  return int(ans)/100

def office_led(ans):
  if ans == "T":
    return 5
  return 0

def office_smart(ans):
  if ans == "T":
    return 5
  return 0

def is_data_centre(ans):
  if ans == "T":
    return True
  return False

def data_postcode(ans):
  if ans[0] == '2':
    return 3
  elif ans[0] == '3':
    return 5
  elif ans[0] == '4':
    return 5
  elif ans[0] == '5':
    return 6
  elif ans[0] == '6':
    return 6
  elif ans[0] == '7':
    return 9
  elif ans[0] == '0':
    return 7
  return 0


def data_capacity(ans):
  return int(ans)

def is_nabers(ans):
  if ans == "T":
    return True
  return False

def nabers_mk(ans):
  return int(ans[0])

def data_elec_amount(ans):
  return int(ans)

def data_elec_percent(ans):
  return int(ans)/100

def is_data_cool(ans):
  if ans == "T":
    return 10
  return 0

def is_cloud(ans):
  if ans == "T":
    return 10
  return 0

def calculate_co2(electricity, green_energy_percent, postcode):
  elec_eff = (electricity * (1-green_energy_percent))/100
  ans = str(postcode)
  return elec_eff * state_co2_covert[ans[0]]

def calculate_habitat(co2e):
  return co2e * co2e_to_habitat