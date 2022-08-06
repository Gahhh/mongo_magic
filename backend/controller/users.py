from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from services.service_users import user_register, user_login, user_get_profile, user_update_profile, user_get_result
from flasgger import Swagger
from flasgger.utils import swag_from

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route('/users/register', methods=['POST'])
@swag_from('../docs/users/register.yml', methods=['POST'])
def register():
  return user_register(request.json)

@users_blueprint.route('/users/login', methods=['POST'])
@swag_from('../docs/users/login.yml', methods=['POST'])
def login():
  return user_login(request.json)

@users_blueprint.route('/users/profile', methods=['GET'])
@jwt_required()
@swag_from('../docs/users/user_profile.yml', methods=['GET'])
def get_profile():
  return user_get_profile(request)

@users_blueprint.route('/users/update_profile', methods=['PATCH'])
@jwt_required()
@swag_from('../docs/users/update_profile.yml', methods=['PATCH'])
def update_profile():
  return user_update_profile(request.json)


@users_blueprint.route('/users/result', methods=['GET'])
@jwt_required()
@swag_from('../docs/users/result.yml', methods=['GET'])
def get_result():
  return user_get_result(request)