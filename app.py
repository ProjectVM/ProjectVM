from flask import Flask, send_from_directory, request, redirect, url_for
from flask_cors import CORS, cross_origin  # comment this on deployment
from werkzeug.utils import secure_filename

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
        "MSG": "400"
    }


@app.route('/register_user', methods=['POST'])
def register():
    account_information = request.json
    email = account_information['email']
    username = account_information['username']
    passw = account_information['password']
    print(email, username, passw)

    # checks username is in database and if the password is strong.
    if len(list(get_acc_with_username(username))) == 0 and check_password_strength(passw):
        insert = {"email": email, "username": username, "password": encrypt_passw(passw)}
        add_acc(insert)
        return {
            "MSG": "200"
        }
    return {
        "MSG": "400"
    }


@app.route('/login_user', methods=['POST'])
def login():
    login_info = request.json
    username = login_info['username']
    password = login_info['password']
    account = list(get_acc_with_username(username))
    if (len(account) != 0 and check_hash(password, account[0]['password'])):
        print("valid")
        return {
            "MSG": "200"
        }
    
    return {
        "MSG": "400"
    }


ALLOWED_EXTENSIONS = set(['png', 'mp3'])
app.config['MAX_CONTENT_LENGTH'] = 80 * 1000 * 1000  # set file size limit to 80 Megabytes


# function to check if file format is valid
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    username = request.form.get('username')
    title = request.form.get('title')
    audio_file = request.files['audioFile']
    # check if the files are the allowed format
    if allowed_file(audio_file.filename):
        filename = secure_filename(audio_file.filename)
        pic_file = request.files['picFile']
        if allowed_file(pic_file.filename):
            picname = secure_filename(pic_file.filename)
            description = request.form.get('description')
            # check that the data is correct
            print(title, filename, picname, description)
            # category = request.form.get('category') not needed yet
            # convert files to data
            # write the description into a txt file
            desc_file = open("description.txt", "w")
            n = desc_file.write(description)
            desc_file.close()
            desc_data = open("description.txt", 'rb')
            # send the data to the s3 database
            add_podcast(username, title, audio_file, pic_file, desc_data)
            return {
            "MSG": "200"
            }
    return {
      "MSG": "400"
    }

@app.route('/podcasts', methods=['GET'])
def get_audiofile_information():
    info_list = get_all_audiofile_information()
    print(info_list)
    return {
        "info_list" : info_list
    }

if __name__ == '__main__':
    app.run()
