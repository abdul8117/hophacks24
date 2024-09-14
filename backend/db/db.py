from config import DATABASE_URL
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