import sqlite3, time

def get_db_connection():
    conn = sqlite3.connect("db/database.db")
    return conn

def create_user(username, name, password_hash, height, weight, age, gender):
    conn = get_db_connection()
    
    cursor = conn.cursor()

    created_at = int(time.time())  # Get the current UNIX timestamp
    
    sql = """INSERT INTO User (username, name, passwordHash, height, weight, age, gender, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"""
    
    cursor.execute(sql, (username, name, password_hash, height, weight, age, gender, created_at))

    conn.commit()
    conn.close()

def get_user_by_username(username):
    conn = get_db_connection()
    
    cursor = conn.cursor()

    sql = """SELECT * FROM User WHERE username = ?"""
    cursor.execute(sql, (username,))

    user = cursor.fetchone()
    conn.close()
    
    return user

def add_meal(user_id, date, photo_path, foods):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """INSERT INTO Meal (userId, mealDate, photoPath)
        VALUES (?, ?, ?)"""

    cursor.execute(sql, (user_id, date, photo_path))
    meal_id = cursor.lastrowid

    for food in foods:
        food_name = food['foodName']
        quantity = food['quantity']
        calories = food['calories']
        protein = food['protein']
        carbohydrates = food['carbohydrates']
        fat = food['fat']
        vitamins = food['vitamins']
        minerals = food['minerals']

        sql = """
            INSERT INTO Food (name, servingSize, calories, protein, carbohydrates, fat)
            VALUES (?, ?, ?, ?, ?, ?)
        """

        cursor.execute(sql, (food_name, quantity, calories, protein, carbohydrates, fat))
        food_id = cursor.lastrowid

        conn.commit()
    
    # insert into MealFood table
    sql = """INSERT INTO MealFood (mealId, foodId, quantity) VALUES (?, ?, ?)"""
    for food in foods:
        cursor.execute(sql, (meal_id, food_id, quantity))
        conn.commit()

    conn.close()

# Function to query meals and foods from the database
def get_meals_for_user(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """
        SELECT
            m.id as mealId,
            m.mealDate,
            m.photoPath,
            m.totalCalories as mealTotalCalories,
            mf.quantity,
            f.name as foodName,
            mf.calories as foodCalories,
            mf.protein as foodProtein,
            mf.carbohydrates as foodCarbs,
            mf.fat as foodFat,
            mf.vitamins as foodVitamins,
            mf.minerals as foodMinerals
        FROM Meal m
        JOIN MealFood mf ON m.id = mf.mealId
        JOIN Food f ON mf.foodId = f.id
        WHERE m.userId = ?
        ORDER BY m.mealDate DESC
        """

    cursor.execute(sql, (user_id,))
    rows = cursor.fetchall()
    
    conn.close()

    meals = {}
    for row in rows:
        id = row[0]
        date = row[1]
        photo_path = row[2]
        total_calories = row[3]
        quantity = row[4]
        food_name = row[5]
        food_calories = row[6]
        food_protein = row[7]
        food_carbs = row[8]
        food_fat = row[9]

        if id not in meals:
            meals[id] = {
                'mealId': id,
                'mealDate': date,
                'photoPath': photo_path,
                'mealTotalCalories': total_calories,
                'foods': []
            }

        meals[id]['foods'].append({
            'foodName': food_name,
            'quantity': quantity,
            'calories': food_calories,
            'protein': food_protein,
            'carbohydrates': food_carbs,
            'fat': food_fat
        })


    return list(meals.values())

def save_journal_entry(user_id, date, entry_text):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """INSERT INTO Journal (userId, entryDate, entryText)
        VALUES (?, ?, ?)"""

    cursor.execute(sql, (user_id, date, entry_text))

    conn.commit()
    conn.close()

def get_journal_entries_for_user(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """
        SELECT
            id,
            entryDate,
            entryText
        FROM Journal
        WHERE userId = ?
        ORDER BY entryDate DESC
        """

    cursor.execute(sql, (user_id,))
    rows = cursor.fetchall()
    
    conn.close()

    entries = []
    for row in rows:
        id = row[0]
        date = row[1]
        entry_text = row[2]

        entries.append({
            'id': id,
            'entryDate': date,
            'entryText': entry_text
        })

    return entries

def get_journal_entry_by_id(user_id, journal_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """
        SELECT
            id,
            entryDate,
            entryText
        FROM Journal
        WHERE userId = ? AND id = ?
        """

    cursor.execute(sql, (user_id, journal_id))
    row = cursor.fetchone()
    
    conn.close()

    entry = {
        'id': row[0],
        'entryDate': row[1],
        'entryText': row[2]
    }

    return entry
