import re
import bcrypt
# At least 1 letter between [a-z] and 1 letter between [A-Z]
# At least 1 number between [0-9]
# At least 1 character from [!@#$%^&*()-+`~]
# Minimum length of 8 characters
def check_password_strength(v):
    if(len(v)>=8):
        if(bool(re.match('((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+`~]).{8,30})',v))==True):
            print("The password is strong")
            return 1
        elif(bool(re.match('((\d*)([a-z]*)([A-Z]*)([!@#$%^&*]*).{8,30})',v))==True):
            print("The password is weak")
            return 0
    else:
        print("You have entered an invalid password.")
        return 0

#encrypt password
def encrypt_passw(passw):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(passw.encode(), salt)

#compare password with hashed password
def check_hash(passw,hash):
    return bcrypt.checkpw(passw.encode(), hash)