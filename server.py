import json
import sys
from flask import Flask, send_from_directory, request, redirect
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin #comment this on deployment
from database import *
from functions import *

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
@cross_origin()
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/register_user', methods=['POST'])
def register():
    account_information = request.json
    email = account_information['email']
    username= account_information['username']
    passw = account_information['password']
    print(email,username,passw)

     #checks username is in database and if the password is strong.
    if len(list(get_acc_with_username(username))) == 0 and check_password_strength(passw):
        insert = {"email": email, "username": username,"password": encrypt_passw(passw)}
        add_acc(insert)

    return {
         "GET": "YEET"
     }
if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(debug=False,host='0.0.0.0',port=port)