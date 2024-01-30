"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def user_create():
    data = request.get_json()
    email=data["email"]
    password=data["password"]
    user=User()
    user.email=email
    user.password=bcrypt.generate_password_hash(password,10).decode("utf-8")
    print(data)
    user.password=password
    user.is_active=True
    db.session.add(user)
    db.session.commit()
    return "ok"

@api.route('/login', methods=['POST'])
def user_login():
    data=request.get_json()
    user=User.query.filter_by(email=data['email']).first()
    #if user is None:
    if bcrypt.check_password_hash(user.password,data["password"])!=True:
        return jsonify({"error": "Usuario no encontrado"}), 401
    if user.password!=data["password"]:
        return jsonify({"error":"Clave inválida"}), 401
    print(user)
    payload={"email":user.email,"nivel": "Administrador"}
    token=create_access_token(identity=user.id, additional_claims=payload)
    return jsonify({"token":token})

@api.route('/helloprotected', methods=['GET'])
@jwt_required()
def hello_protected():
    id=get_jwt_identity()
    payload=get_jwt()
    return jsonify({"id":id, "rol": payload["nivel"]})
    #data=request.get_json()