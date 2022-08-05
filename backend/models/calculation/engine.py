from sqlalchemy import true
from models.calculation.answers import *
def engine(office, data):
  office_result = []
  if office:
    for item in office:
      electricity = 0
      employee = 0
      floor = 0
      green_energy_percent = 0
      total = 0
      for key in item.keys():
        if key == "office_floor_space":
          floor = eval(f"{key}({item[key]})")
        elif key == "office_employee_num":
          employee = eval(f"{key}({item[key]})")
        elif key == "office_elec_percent":
          green_energy_percent = eval(f"{key}({item[key]})")
        elif key == "office_elec_amount":
          electricity = eval(f"{key}({item[key]})")
        else:
          x = eval(f"{key}('{item[key]}')")
          print(x)
        
  return None