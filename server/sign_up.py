# from flask import Flask, request, jsonify

# app = Flask(__name__)

# @app.route('/sign-up', methods = ['POST', "GET"])
# def sign_up():
#     if request.method == "GET":
#         return 'hello World'
#     else:
#         user = request.get_json()
#         response = {
#             'email'    : user['email'],
#             'password' : user['password']
#         }
#         return jsonify(response), 200	