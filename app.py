from flask import Flask
from flask import Flask, send_from_directory, request, redirect
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin #comment this on deployment
from database import *
from functions import *

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {
        "MSG" : "400"
    }

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
            "MSG": "200"
        }
    return {
         "MSG": "400"
     }

@app.route('/login_user', methods=['POST'])
def login():
    print("head start!")
    aws_check()
    login_info = request.json
    username = login_info['username']
    password = login_info['password']
    account = list(get_acc_with_username(username))
    if(len(account) != 0 and check_hash(password,account[0]['password'])):
        print("valid")
        return {
            "MSG": "200"
        }
    return{
            "MSG": "400"
    }

if __name__ == '__main__':
    app.run()

