from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from fatsecret import Fatsecret

from db.db import *
from backend.utils.utils import *

import datetime, time, os

app = Flask(__name__)
app.secret_key = "super secret key"

@app.route('/')
def index():
    return jsonify(message="Welcome to my Flask app!")

# Sign up route
@app.route('/sign-up', methods=['POST'])
def sign_up():
    data = request.get_json()

    username = data.get('username')
    name = data.get('name')
    password = data.get('password')
    height = data.get('height')
    weight = data.get('weight')
    age = data.get('age')
    gender = data.get('gender')

    # Hash the password
    password_hash = generate_password_hash(password)

    # Insert user into the database
    create_user(username, name, password_hash, height, weight, age, gender)

    session['username'] = username

    return jsonify({'message': 'User created successfully'})

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    user = get_user_by_username(username)

    print(user)

    if user and check_password_hash(user[3], password):
        session['username'] = username
        return jsonify({'message': 'Login successful', 'status': 'success'})
    else:
        return jsonify({'message': 'Invalid username or password', 'status': 'error'}), 401

# Logout route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logout successful', 'status': 'success'})

# Route to check if the user is logged in
@app.route('/validate_session', methods=['GET'])
def validate_session():
    if 'username' in session:
        return jsonify({'username': session['username'], 'status': 'success'})
    else:
        return jsonify({'message': 'Not logged in', 'status': 'error'}), 401


"""
When we add a new meal to the database, we will first receive the a photo of the meal.
We will then save this photo in /backend/uploads/<username>/<meal_id>.jpg
Then, we will save the path to this photo in the database.
Then, make a request to Gemini containing the photo along with a prompt asking for each food item and its quantity.
Store the response in memory.
Make requests to the nutrition API to get the nutrition information for each food item.
Adjust the nutritional data based on quantity.
Store the nutritional data in the database. 

When the meal form is submitted by the user, we need the following data:
- The user's username or ID
- Date (UNIX timestamp)

After we make the request to Gemini, we will receive data about:
- The food items in the meal
- The quantity of each food item

After we make the requests to the nutrition API, we will receive data about:
- The nutritional information for each food item

Finally, store all this information in the database;

In the Meal table, we will store:
- The user's username or ID
- Date (UNIX timestamp)
- The path to the photo of the meal

In the Food table, we will store:
- Name of the food
- Standard serving size (e.g. 100g)
- Nutritional information per the standard serving size

In the MealFood table, we will store:
- The ID of the meal
- The ID of the food
- The quantity of the food
"""

@app.route('/add-meal', methods=['POST'])
def add_meal():
    if request.files:
        photo = request.files['photo']
        path = f'uploads/{session["username"]}/{photo.filename}_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.jpg'
        photo.save(path)

        # Get the user's ID
        user = get_user_by_username(session['username'])
        user_id = user[0]

        # Get the current UNIX timestamp
        date = int(time.time())

        # Make a request to Gemini
        # Get the food items in the meal
        food_items = get_food_items(path)

        # Make a request to the nutrition API
        for food in food_items:
            food_name = food['foodName']
            nutrition = get_food_nutrition(food_name)

            food['calories'] = nutrition['calories']
            food['protein'] = nutrition['protein']
            food['carbohydrates'] = nutrition['carbohydrates']
            food['fat'] = nutrition['fat']
            food['vitamins'] = nutrition['vitamins']
            food['minerals'] = nutrition['minerals']

        # Insert the meal into the database
        add_meal(user_id, date, path)

        return jsonify({'message': 'Meal added successfully', 'status': 'success'})

@app.route('/get-meals', methods=['GET'])
def get_meals():
    user = get_user_by_username(session['username'])
    user_id = user[0]

    meals = get_meals_for_user(user_id)

    return jsonify({'meals': meals})

@app.route('/save-journal-entry', methods=['POST'])
def save_journal_entry():
    data = request.get_json()

    user = get_user_by_username(session['username'])
    user_id = user[0]

    date = data.get('date')
    entry_text = data.get('entry_text')

    save_journal_entry(user_id, date, entry_text)

    return jsonify({'message': 'Journal entry saved successfully', 'status': 'success'})

@app.route('/get-journal-entries', methods=['GET'])
def get_journal_entries():
    user = get_user_by_username(session['username'])
    user_id = user[0]

    entries = get_journal_entries_for_user(user_id)

    return jsonify({'entries': entries})

@app.route('/get-journal-entry/<int:journal_id>', methods=['GET'])
def get_journal_entry(journal_id):
    user = get_user_by_username(session['username'])
    user_id = user[0]

    entry = get_journal_entry_by_id(user_id, journal_id)

    return jsonify({'entry': entry})

if __name__ == '__main__':
    app.run(debug=True)


"""
mealID, foodId, quantity
1,1,100
1,2,200
"""