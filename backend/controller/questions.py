from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from flasgger import Swagger
from flasgger.utils import swag_from
from services.service_questions import question_add, question_list, question_answer, question_temp_save, question_temp_load, question_get_result

questions_blueprint = Blueprint('question', __name__)

@questions_blueprint.route('/question/addin', methods=['POST'])
@jwt_required()
@swag_from('../docs/question/add_question.yml', methods=['POST'])
def add():
    return question_add(request.json)

@questions_blueprint.route('/question/list', methods=['GET'])
@jwt_required()
@swag_from('../docs/question/get_question.yml', methods=['GET'])
def get_list():
    return question_list(request)

@questions_blueprint.route('/question/answer', methods=['POST'])
@jwt_required()
@swag_from('../docs/question/answer_question.yml', methods=['POST'])
def get_answer():
    return question_answer(request.json)

@questions_blueprint.route('/question/save', methods=['POST'])
@jwt_required()
@swag_from('../docs/question/temp_save_question.yml', methods=['POST'])
def temp_save():
    return question_temp_save(request.json)

@questions_blueprint.route('/question/load', methods=['GET'])
@jwt_required()
@swag_from('../docs/question/temp_load_question.yml', methods=['GET'])
def temp_get():
    return question_temp_load(request)

@questions_blueprint.route('/question/result', methods=['GET'])
@jwt_required()
@swag_from('../docs/question/get_result.yml', methods=['GET'])
def get_result():
    id = request.args.get('id')
    return question_get_result(id) 