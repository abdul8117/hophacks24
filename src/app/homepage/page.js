"use client";

import Layout from '@/components/Layout';
import NutrientChart from '@/components/NutrientChart';
import UploadForm from '@/components/UploadForm';
import MealTable from '@/components/MealTable';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  
  const [meals, setMeals] = useState([
    { meal: "Breakfast: Eggs & Toast", calories: 412, proteins: 27, fats: 18, carbs: 32 },
  ]);
  const [nutrientData, setNutrientData] = useState({
    calories: [2000, 1800, 2200, 2500, 2100, 2300, 412],
    proteins: [90, 100, 80, 110, 95, 105, 27],
    carbs: [300, 280, 320, 330, 310, 350, 32],
    fats: [70, 65, 80, 75, 85, 90, 18],
  });

  const lunch = {
    meal: "Lunch: Chicken Salad",
    calories: 625,
    proteins: 47,
    fats: 34,
    carbs: 43
  }

  function addLunch() {
    setMeals([...meals, lunch]);
  }

  const newText = "Adding more carbs to the rest of your meals today will lead to a more balanced diet."
  function addNewText() {
    let x = document.querySelector("#newText");
    x.innerHTML = newText;
  }

  function updateChart() {
    setNutrientData({
      calories: [2000, 1800, 2200, 2500, 2100, 2300, 412 + 625],
      proteins: [90, 100, 80, 110, 95, 105, 27 + 47],
      carbs: [300, 280, 320, 330, 310, 350, 32 + 43],
      fats: [70, 65, 80, 75, 85, 90, 18 + 34],
    });
  }

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen justify-between">
        {/* Left side with chart */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-2 mt-6 flex justify-center">Hey Raghav! Let's see how you're doing so far...</h2>
          <NutrientChart nutrientData={nutrientData} />
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center mt-5 gap-5 justify-start">
          {/* Meals Table */}
          <MealTable meals={meals} />

          {/* Upload Form */}
          <UploadForm addLunch={addLunch} addNewText={addNewText} updateChart={updateChart} />

          {/* Key Takeaways */}
          <div className="key-takeaways mt-6 p-6 rounded-lg w-full">
            <h2 className="text-2xl font-bold mb-2">Key Takeaways</h2>
            <p>Your calorie intake seems lower than usual so far.</p>
            <p id="newText"></p>
            <button
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => window.location.href='/takeaways'}>
              Read more tips →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
