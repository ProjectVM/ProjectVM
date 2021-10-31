import pymongo
from pymongo import MongoClient
import boto3
from dotenv import load_dotenv
import os

load_dotenv()

# connect to s3
s3 = boto3.resource(
    service_name='s3',
    region_name='us-east-1',
    aws_access_key_id=os.environ.get("AWS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_KEY")
)

# aws S3 check function
def aws_check():
    for bucket in s3.buckets.all():
        print(bucket.name)

# db connection 
cluster = MongoClient("mongodb+srv://nrpatel5:ProjectVM@cluster0.idgc0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster["projectvm"]

#add new acc to database
#input is a dictionary of the email, username and password in that order.
def add_acc(account_data):
    # connect to accoutn data collection
    collection = db["acc_data"]

    # data encryption is done here
    collection.insert_one(account_data)
    return

#get acc from database using the username
#input is the username of the account
def get_acc_with_username(username):

    # connect to accoutn data collection
    collection = db["acc_data"]

    # data encryption is done here
    return collection.find({"username": username})

#create podcast list for user (only occurs one time when account is created)
#input is a dictionary of the email, username and password in that order.
def create_podcast_list(account_data):

    # connect to account podcast data collection
    pods_collect = db["acc_pods"]

    # username = account_data['username']
    info = {'username': account_data['username'], 'podcasts': []}

    return pods_collect.insert_one(info)

#add podcast to podcast list
def add_podcast(username, podcast_name):
    pods_collect = db["acc_pods"]

    podcast_file_name = username + "_" + podcast_name
    # route in s3, to store the file at. (unique name is given by combining the username and the name of podcast)
    podcast_location = f"podcasts/{podcast_file_name}.m4a"
    

    podcast_list = pods_collect.find_one({"username": username})['podcasts']
    podcast_list.append(podcast_name)

    newvalues = { "$set": {"podcasts": podcast_list}}

    return pods_collect.update_one({"username": username}, newvalues)

    






#function to delete all traces of the user in the database
def delete_user(username):
    collection = db["acc_data"]
    pods_collect = db["acc_pods"]

    collection.remove({"username": username})
    return pods_collect.remove({"username": username})



