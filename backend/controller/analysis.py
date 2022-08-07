from flask import request, Blueprint
from flask_jwt_extended import jwt_required
from flasgger import Swagger
from flasgger.utils import swag_from
from services.analysis import analysis_data

analysis_blueprint = Blueprint('analysis', __name__)

@analysis_blueprint.route('/analysis/data', methods=['POST'])
# @swag_from('../docs/analysis/get_analysis_data.yml', methods=['POST'])
@jwt_required()
def get_analysis_data():
    return analysis_data(request.json)