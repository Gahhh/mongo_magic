
def office_postcode(ans):
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

def is_public_transport(ans):
  if ans:
    return 4
  return 0

def public_trans_option(ans):
  return 4*(len(ans)-1)

def office_floor_space(ans):
  return int(ans)

def office_employee_num(ans):
  return int(ans)

def is_green_star(ans):
  if ans:
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
  if ans:
    return 10
  return 0

def is_ac_smart(ans):
  if ans:
    return 10
  return 

def office_elec_percent(ans):
  return int(ans)

def office_elec_percent(ans):
  return int(ans)/100

def office_led(ans):
  if ans:
    return 5
  return 0

def office_smart(ans):
  if ans:
    return 5
  return 0

def is_data_centre(ans):
  if ans == "true":
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
  if ans == "true":
    return True
  return False

def nabers_mk(ans):
  return int(ans[0])

def data_elec_amount(ans):
  return int(ans)

def data_elec_percent(ans):
  return int(ans)/100

def is_data_cool(ans):
  if ans:
    return 10
  return 0

def is_cloud(ans):
  if ans:
    return 10
  return 0
