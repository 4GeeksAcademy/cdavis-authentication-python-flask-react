"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


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
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if email and password:
        pw_hash=current_app.bcrypt.generate_password_hash(password).decode("utf-8")
        # Create a new user instance
        new_user = User(email=email, password=pw_hash, is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 200
    else:
        return jsonify({'error': 'Missing email or password'}), 400


@api.route('/login', methods=['POST'])
def user_login():
    data=request.get_json()
    user=User.query.filter_by(email=data['email']).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    if current_app.bcrypt.check_password_hash(user.password,data["password"])!=True:
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401
   
    print(user)
    token=create_access_token(identity=user.email)
    return jsonify({"user": user.serialize(), "token":token}), 200



@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"user": user.serialize()}), 200
    #data=request.get_json()