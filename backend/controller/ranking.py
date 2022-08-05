from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from flasgger import Swagger
from flasgger.utils import swag_from
from services.ranking import ranking_get_list
ranking_blueprint = Blueprint('ranking', __name__)

@ranking_blueprint.route('/ranking/list', methods=['GET'])
@swag_from('../docs/ranking/get_ranking.yml', methods=['GET'])
def get_list():
    return ranking_get_list(request)