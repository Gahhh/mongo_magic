from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from flasgger import Swagger
from config import swagger_config, swagger_template
app = Flask(__name__)

Swagger(app, template=swagger_template, config=swagger_config)
JWTManager(app)
CORS(app)
app.config["JWT_ALGORITHM"] = "HS256"
app.config["JWT_SECRET_KEY"] = "deloitte"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=100)

from controller.users import users_blueprint
from controller.questions import questions_blueprint
from controller.support import user_support_blueprint
from controller.ranking import ranking_blueprint
from controller.analysis import analysis_blueprint
app.register_blueprint(questions_blueprint)
app.register_blueprint(users_blueprint)
app.register_blueprint(user_support_blueprint)
app.register_blueprint(ranking_blueprint)
app.register_blueprint(analysis_blueprint)

if __name__ == '__main__':
    app.run(debug=True)