import sys
from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin #comment this on deployment
from database import *

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
    add_acc(account_information)
    return {
        "GET": "YEET"
    }

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(debug=False,host='0.0.0.0',port=port)