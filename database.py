import pymongo
from pymongo import MongoClient

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
def get_acc(Username):

    # connect to accoutn data collection
    collection = db["acc_data"]

    # data encryption is done here
    for x in collection.find({"username": Username}):
        print(x)
    return
