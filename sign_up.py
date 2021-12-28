from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/sign-up', methods = ['POST'])
def sign_up():
    user = request.body
    response = {
    	'email'    : user['email'],
        'password' : user['password']
    }
    return jsonify(response), 200	