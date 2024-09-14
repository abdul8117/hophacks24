from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash

from db.db import *

import datetime, sqlite3, time

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
@app.route('/profile', methods=['GET'])
def profile():
    if 'username' in session:
        return jsonify({'username': session['username'], 'status': 'success'})
    else:
        return jsonify({'message': 'Not logged in', 'status': 'error'}), 401

if __name__ == '__main__':
    app.run(debug=True)

