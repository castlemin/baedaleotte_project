# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS
# from flask_migrate import Migrate

# app = Flask(__name__)

# app.route('/sign-up', methods = ['POST'])
# def sign_up():
#     user = request.body
#     response = {
#     	'email'    : user['email'],
#         'password' : user['password']
#     }
#     return jsonify(response), 200	