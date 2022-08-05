from sqlalchemy import true
from models.calculation.answers import *
def engine(office, data):
  office_result = {}
  if office:
    co2e = 0
    habitat = 0
    employee = 0
    total_floor = 0
    total_electricity = 0
    for item in office:
      electricity = 0
      green_energy_percent = 0
      total = 0
      postcode = 0
      for key in item.keys():
        if key == "office_floor_space":
          floor = eval(f"{key}({item[key]})")
        elif key == "office_employee_num":
          employee = eval(f"{key}({item[key]})")
        elif key == "office_elec_percent":
          green_energy_percent = eval(f"{key}({item[key]})")
        elif key == "office_elec_amount":
          electricity = eval(f"{key}({item[key]})")
        elif key == "office_postcode":
          postcode = item[key]
        else:
          total += eval(f'{key}("{item[key]}")')
      employee += employee
      total_floor += floor
      co2e += calculate_co2(electricity, green_energy_percent, postcode)
      habitat += calculate_habitat(co2e)
      total_electricity += electricity
    avg_energy = total_electricity / total_floor /employee
    
      
  return None