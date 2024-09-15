from werkzeug.security import generate_password_hash

import sqlite3, time, random

USERS = [
    ("jdoe1", "John Doe", generate_password_hash("securepassword"), 160, 60, 20, "Male", time.time()),
]

FOOD = [
    (1, "Apple", "100 grams", 52, 0.3, 14, 0.2),
    (2, "Chicken Breast", "100 grams", 165, 31, 0, 3.6),
    (3, "White Rice", "100 grams", 130, 2.7, 28, 0.3),
    (4, "Broccoli", "100 grams", 34, 2.8, 7, 0.4),
    (5, "Whole Milk", "100 ml", 61, 3.2, 4.8, 3.3),
    (6, "Almonds", "100 grams", 579, 21, 22, 50),
    (7, "Egg", "1 large", 72, 6.3, 0.6, 5),
    (8, "Banana", "100 grams", 89, 1.1, 23, 0.3),
    (9, "Peanut Butter", "100 grams", 588, 25, 20, 50),
    (10, "Salmon (Grilled)", "100 grams", 206, 22, 0, 12),
    (11, "Greek Yogurt", "100 grams", 59, 10, 3.6, 0.4),
    (12, "Sweet Potato", "100 grams", 86, 1.6, 20, 0.1),
    (13, "Tofu", "100 grams", 76, 8, 1.9, 4.8),
    (14, "Quinoa (Cooked)", "100 grams", 120, 4.1, 21.3, 1.9),
]

MEALS = []

MEAL_FOOD = [
    (1, 1, 100),  # Apple, 100 grams
    (2, 2, 150),  # Chicken Breast, 150 grams
    (3, 3, 200),  # Rice, 200 grams
    (4, 4, 80),   # Broccoli, 80 grams
    (5, 5, 200),  # Whole Milk, 200 ml
    (6, 6, 30),   # Almonds, 30 grams
    
    (7, 1, 150),  # Apple, 150 grams
    (8, 7, 1),    # Egg, 1 large
    (9, 8, 100),  # Banana, 100 grams
    
    (10, 9, 50),  # Peanut Butter, 50 grams
    (11, 10, 100),# Salmon, 100 grams
    (12, 11, 150),# Greek Yogurt, 150 grams
    
    (13, 1, 100), # Apple, 100 grams
    (14, 12, 150),# Sweet Potato, 150 grams
    (15, 2, 200), # Chicken Breast, 200 grams
    (16, 14, 100),# Quinoa, 100 grams
    (17, 13, 120),# Tofu, 120 grams
]


def create_dummy_meals():
    # Constants
    USER_ID = 1
    NUM_DAYS = 7
    MEAL_PATH = "uploads/jdoe1/plate-of-food"

    # Current time (Unix timestamp)
    current_time = time.time()

    # Generate meals data
    for day in range(NUM_DAYS):
        # Calculate the timestamp for the start of the day (midnight)
        start_of_day = current_time - (day * 86400)

        # Randomly decide if there will be 2 or 3 meals for the day
        num_meals = random.choice([2, 3])

        # Generate meals for the day with random times
        for meal in range(num_meals):
            # Offset the time within the day (spread the meals within the 24 hours)
            meal_time = start_of_day - random.randint(0, 86400)
            MEALS.append((USER_ID, meal_time, MEAL_PATH))
create_dummy_meals()

def create_dummy_data():
    # Database connection
    conn = sqlite3.connect('../db-dummy/database-dummy.db')
    cursor = conn.cursor()

    # Insert data into Food table
    cursor.executemany('''
        INSERT INTO "Food" ("id", "name", "servingSize", "calories", "protein", "carbohydrates", "fat")
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', FOOD)

    conn.commit()

    # Insert data into Meal table
    cursor.executemany('''
        INSERT INTO "Meal" ("id", "mealDate", "photoPath")
        VALUES (?, ?, ?)
    ''', MEALS)

    conn.commit()

    # Insert data into MealFood table
    cursor.executemany('''
        INSERT INTO "MealFood" ("id", "mealId", "foodId", "quantity")
        VALUES (?, ?, ?, ?)
    ''', MEAL_FOOD)

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()

    print("Data inserted successfully!")
    

for meal in MEALS:
    print(meal)


create_dummy_data()