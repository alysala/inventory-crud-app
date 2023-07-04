import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import bcrypt
import datetime
import uuid
from flask_cors import CORS  
from bson.json_util import dumps

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

    @return response containing auth details
    """
    reqData = request.get_json()
    user_db = mongo.db['users']

    uname = reqData['username']
    password = reqData['password']

    if 'firstname' in reqData.keys():
        fname = reqData['firstname']
        lname = reqData['lastname']

        if user_db.find_one({'username': uname}) is not None:
            return {'login': 'failed', 'message': 'A user with this username already exists! Try logging in instead.'}, 400
        
        # Hash the password
        salt = bcrypt.gensalt()
        hashedWord = bcrypt.hashpw(password.encode('utf-8'), salt)
        new_user = {
            'id': str(uuid.uuid4()),
            'firstname': fname,
            'lastname': lname,
            'username': uname,
            'password': hashedWord
        }
        user_db.insert_one(new_user)
    else:
        check_user = user_db.find_one({'username': uname})
        if check_user is None:
            return {'login': 'failed',
                    'message': 'No user with this username could be found. Try again or register this username'}, 400
        if not bcrypt.checkpw(password.encode('utf-8'), check_user['password']):
            return {'login': 'failed',
                    'message': 'The password you entered is incorrect, please try again.'}, 401

    response = jsonify({'login': 'success', 'current_user': uname})
    return response


@app.route('/get-inventory', methods=['GET'])
def get_inventory():
    """
    Route: get inventory records from the system
    methods: GET
    endpoint: /get-inventory

    @return inventory records
    """
    item_db = mongo.db['items']
    inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'get-inventory': 'success', 'inventory': dumps(inventory)})
    return response


@app.route('/update-inventory', methods=['POST'])
def update_inventory():
    """
    Route: update inventory records in the system
    methods: POST
    endpoint: /update-inventory

    @jsonparam user
    @jsonparam name
    @jsonparam oldName
    @jsonparam decription
    @jsonparam quantity

    @return result
    """
    req_data = request.get_json()
    username = req_data['user']
    name = req_data['name']
    old_name = req_data['oldName']
    description = req_data['description']
    quantity = req_data['quantity']

    item_db = mongo.db['items']

    item_db.find_one_and_delete({'name': old_name})
    new_item = {
    'id': str(uuid.uuid4()),
    'name': name,
    'description': description,
    'quantity': quantity,
    'userId': username
    }
    item_db.insert_one(new_item)

    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-update': 'success', 'inventory': dumps(new_inventory)})
    return response


@app.route('/add-inventory', methods=['POST'])
def add_inventory():
    """
    Route: add inventory records to the system
    methods: POST
    endpoint: /add-inventory

    @jsonparam username
    @jsonparam name
    @jsonparam decription
    @jsonparam quantity

    @return result
    """
    req_data = request.get_json()
    username = req_data['user']
    name = req_data['name']
    description = req_data['description']
    quantity = req_data['quantity']

    item_db = mongo.db['items']

    if item_db.find_one({'name': name}) is not None:
            return {'item-addition': 'failed', 'message': 'An item with this name already exists! See if the item already exists.'}, 400
    
    new_item = {
    'id': str(uuid.uuid4()),
    'name': name,
    'description': description,
    'quantity': quantity,
    'userId': username
    }
    item_db.insert_one(new_item)
    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-addition': 'success', 'inventory': dumps(new_inventory)})
    return response


@app.route('/delete-inventory', methods=['POST'])
def remove_inventory():
    """
    Route: remove inventory records from the system
    methods: POST
    endpoint: /remove-inventory

    @jsonparam name

    @return result
    """
    req_data = request.get_json()
    name = req_data['name']
    item_db = mongo.db['items']
    if item_db.find_one({'name': name}) is None:
        return {'item-deletion': 'failed', 'message': 'An item with this name does not exist.'}, 400
    
    item_db.find_one_and_delete({'name': name})
    new_inventory = list(item_db.find({'name': {'$exists': True}}))
    response = jsonify({'item-deletion': 'success', 'inventory': dumps(new_inventory)})
    return response


if __name__ == '__main__':
    app.run(debug=True)
