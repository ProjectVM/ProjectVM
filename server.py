from flask import Flask, send_from_directory, request
from flask.wrappers import Request
from flask_restful import Api, Resource, reqparse
#from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from pymongo import MongoClient
from database import *
import sys

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#CORS(app) #comment this on deployment
api = Api(app)

@app.route('/', methods=['GET'])
def serve():
    return send_from_directory(app.static_folder,'index.html')

@app.route('/api', methods=['GET'])
def api_serve():
    return {
        "flask": "Connected to React"
    }

@app.route('/api/register_user', methods=['POST'])
def register():
    account_information = request.json
    add_acc(account_information)
    return {
        "GET": "YEET"
    }


api.add_resource(HelloApiHandler, '/flask/hello')

if __name__ == '__main__':
    # port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    # print(port)
    # app.run(debug=False,host='0.0.0.0',port=port)
    app.run(debug=True)