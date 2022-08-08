from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from flasgger import Swagger
from flasgger.utils import swag_from
from services.analysis import analysis_data, digram_data, stats_data

analysis_blueprint = Blueprint('analysis', __name__)

@analysis_blueprint.route('/analysis/data', methods=['POST'])
@jwt_required()
@swag_from('../docs/analysis/get_analysis_data.yml', methods=['POST'])
def get_analysis_data():
    return analysis_data(request.json)

@analysis_blueprint.route('/analysis/user_diagram', methods=['GET'])
@jwt_required()
# @swag_from('../docs/analysis/get_analysis_data.yml', methods=['GET'])
def get_digram_data():
    return digram_data(request)

@analysis_blueprint.route('/analysis/admin_stats', methods=['GET'])
# @jwt_required()
# @swag_from('../docs/analysis/get_stats_data.yml', methods=['GET'])
def get_stats_data():
    return stats_data(request)