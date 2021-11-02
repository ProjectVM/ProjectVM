import pymongo
from pymongo import MongoClient
import boto3
from dotenv import load_dotenv
import os

load_dotenv()

# Bucket name used in s3
Bucket_Name = 'cse442-projectvm'

# connect to s3
s3 = boto3.resource(
    service_name='s3',
    region_name='us-east-1',
    aws_access_key_id=os.environ.get("AWS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_KEY")
)

# db connection 
cluster = MongoClient("mongodb+srv://nrpatel5:ProjectVM@cluster0.idgc0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster["projectvm"]


# adds new account into the database (account information && empty podcast list)
def add_acc(account_data):
    add_acc_info(account_data)
    return create_podcast_list(account_data)


#get acc information from database using the username
def get_acc_with_username(username):
    collection = db["acc_data"]
    return collection.find({"username": username})


#add podcast to podcast list, including the image and the description into s3

#to use add_podcast you must pass the podcast_audio_data, podcast_image_data, podcast_description_data which should be
#done in app.py before calling this function. So the data has to be ready to be put into s3 when put into this function. 
def add_podcast(username, podcast_name, podcast_audio_data, podcast_image_data, podcast_description_data):
    # add information to the database (add podcast into list of owned podcasts)
    pods_collect = db["acc_pods"]

    podcast_list = pods_collect.find_one({"username": username})['podcasts']
    podcast_list.append(podcast_name)

    newvalues = { "$set": {"podcasts": podcast_list}}
    pods_collect.update_one({"username": username}, newvalues)

    # add podcast information into s3
    filename = username + '_' + podcast_name

    s3.Bucket(Bucket_Name).put_object(Key=f"podcast_audio/{filename}.mp3", Body=podcast_audio_data)
    s3.Bucket(Bucket_Name).put_object(Key=f"podcast_image/{filename}.png", Body=podcast_image_data)
    s3.Bucket(Bucket_Name).put_object(Key=f"podcast_description/{filename}.txt", Body=podcast_description_data)

#function to delete all traces of the user in the database
def delete_user(username):
    collection = db["acc_data"]
    pods_collect = db["acc_pods"]

    podcast_list = pods_collect.find_one({"username": username})['podcasts']

    for i in podcast_list:
        s3.Bucket(Bucket_Name).delete_object(Key=f"podcast_audio/{i}.mp3")
        s3.Bucket(Bucket_Name).delete_object(Key=f"podcast_image/{i}.png")
        s3.Bucket(Bucket_Name).delete_object(Key=f"podcast_description/{i}.txt")

    collection.remove({"username": username})
    pods_collect.remove({"username": username})
    return

    
# def display_all_user_podcasts():



# --------------- helper functions below ------------------

#add new acc to database
#input is a dictionary of the email, username and password in that order.
def add_acc_info(account_data):
    # connect to accoutn data collection
    collection = db["acc_data"]

    # data encryption is done here
    collection.insert_one(account_data)
    return


#create podcast list for user (only occurs one time when account is created)
#input is a dictionary of the email, username and password in that order.
def create_podcast_list(account_data):

    # connect to account podcast data collection
    pods_collect = db["acc_pods"]

    # username = account_data['username']
    info = {'username': account_data['username'], 'podcasts': []}

    return pods_collect.insert_one(info)
