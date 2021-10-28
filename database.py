import pymongo
from pymongo import MongoClient
import boto3

# connect to s3
s3 = boto3.resource(
    service_name='s3',
    region_name='us-east-1',
    aws_access_key_id='AKIAX7VKNCZFBN7YVE4Z',
    aws_secret_access_key='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'
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

