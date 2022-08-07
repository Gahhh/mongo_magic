from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from flasgger import Swagger
from flasgger.utils import swag_from
from services.support import support_question_add, support_question_list, support_question_solve

user_support_blueprint = Blueprint('support', __name__)

@user_support_blueprint.route('/support/question', methods=['POST'])
@swag_from('../docs/support/add_question.yml', methods=['POST'])
def add():
    return support_question_add(request.json)

@user_support_blueprint.route('/support/list', methods=['GET'])
@jwt_required()
@swag_from('../docs/support/list_question.yml', methods=['GET'])
def get_question_list():
    return support_question_list(request)

@user_support_blueprint.route('/support/solve', methods=['POST'])
@jwt_required()
@swag_from('../docs/support/solve_question.yml', methods=['POST'])
def solve_question_():
    return support_question_solve(request.json)
  
