import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bcrypt
import datetime
import uuid
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/inventory"
app.config['MONGO_DBNAME'] = 'inventory-crud-app'
mongo = PyMongo(app)
CORS(app, supports_credentials=True)

@app.route('/create-account', methods=['POST'])
def create_account():
    """
    Route: register a new user into the system
    methods: POST
    endpoint: /create-account

    @jsonparam firstname
    @jsonparam lastname
    @jsonparam username
    @jsonparam password

    @return response containing auth and user cookies
    """
    reqData = request.get_json()
    userDB = mongo.db['users']

    uname = reqData['username']
    password = reqData['password']

    if 'firstname' in reqData.keys():
        # Register a new user
        fname = reqData['firstname']
        lname = reqData['lastname']
        # Check to make sure this user doesn't already exist
        if userDB.find_one({'username': uname}) is not None:
            return {'login': 'failed', 'message': 'A user with this username already exists! Try logging in instead.'}, 400
        # Hash the password
        salt = bcrypt.gensalt()
        hashedWord = bcrypt.hashpw(password.encode('utf-8'), salt)
        # Insert user into the database
        new_user = {
            'id': str(uuid.uuid4()),
            'firstname': fname,
            'lastname': lname,
            'username': uname,
            'password': hashedWord
        }
        userDB.insert_one(new_user)
    else:
        # Log the user in
        checkUser = userDB.find_one({'username': uname})
        # Check that user exists
        if checkUser is None:
            return {'login': 'failed',
                    'message': 'No user with this username could be found. Try again or register this username'}, 400

        # Check the provided password
        if not bcrypt.checkpw(password.encode('utf-8'), checkUser['password']):
            return {'login': 'failed',
                    'message': 'The password you entered is incorrect, please try again.'}, 401

    # Generate an auth token, set cookies and return response
    response = jsonify({'login': 'success', 'current_user': uname})

    return response

if __name__ == '__main__':
    app.run(debug=True)
