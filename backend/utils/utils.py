from PIL import Image
import PIL.Image
import google.generativeai as genai
from fatsecret import Fatsecret

import sqlite3, os

# Credits to Aarav, Josephine
def get_food_items(image_path):
    api_key = os.getenv("GEMINI_API_KEY")

    model_name = "gemini-1.5-flash"
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name=model_name)

    img = PIL.Image.open(image_path)
    prompt = "Give me a list of food and drink items that you can see in the image in the following format: <Name>, <Quantity> where each entry separated by a semicolon. Here are some reference weights: 1 orange slice is 17 grams, 1 medium banana is 120 grams, and 1 chicken quarter leg is 200 grams. Do you best to accurately estimate the weight of each food and drink. You must provide the quantity in grams for solid food and For example: Chicken, 200; Rice, 300; Orange juice, 100"

    response = model.generate_content([prompt, img], stream=True).resolve().text

    print(response)
    
    food_items = []
    for entry in response.split(";"):
        food_name, quantity = entry.split(",")
        food_items.append({
            'foodName': food_name.strip(),
            'quantity': quantity.strip()
        })

    return food_items

def get_food_nutrition(food_name):
    fs = Fatsecret(os.getenv('FAT_SECRET_API_CLIENT_ID'), os.getenv('FAT_SECRET_API__SECRET'))
    nutrition = fs.foods_search(food_name)

    return nutrition

