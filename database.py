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
collection = db["acc_data"]

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
def get_acc_with_username(Username):

    # connect to accoutn data collection
    collection = db["acc_data"]

    # data encryption is done here
    return collection.find({"username": Username})

