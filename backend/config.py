swagger_template = {
  "swagger": "2.0",
    "info": {
      "title": "MongoMagic sustainability project API",
      "description": "API Documentation for MongoMagic",
      "version": "1.0.0"
    },
    "basePath": "/",
    "schemes": [
      "http",
      "https"
    ],
    "operationId": "getmyData",
    "securityDefinitions": {
      'Bearer': {
            'type': 'apiKey',
            'name': 'authorization',
            'in': 'header',
            'description': 'Please add "Bearer [token]" to the value of the Authorization header.'
      }
    }
}

swagger_config = {
  "headers": [
    ],
    "specs": [
      {
        "endpoint": 'apispec_1',
        "route": '/apispec_1.json',
        "rule_filter": lambda rule: True,  # all in
        "model_filter": lambda tag: True,  # all in
      }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/"
}

