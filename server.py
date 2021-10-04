import sys
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin #comment this on deployment
from api.HelloApiHandler import HelloApiHandler


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

<<<<<<< HEAD
@app.route('/login', methods=['GET'])
def login():
=======
@app.route("/", defaults={'path':''})
@cross_origin()
def serve(path):
>>>>>>> 73bfacac90f0a5eb3b03bbe2bd8c45fd9b2d0578
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(HelloApiHandler, '/flask/hello')

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    app.run(debug=False,host='0.0.0.0',port=port)