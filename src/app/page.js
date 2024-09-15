"use client";

import Layout from '@/components/Layout';
import NutrientChart from '@/components/NutrientChart';
import UploadForm from '@/components/UploadForm';
import MealTable from '@/components/MealTable';
import HomePage from './homepage/page';
import { useEffect, useState } from 'react';
import API_URL from '@/utils/utils';

export default function Home() {
  const [meals, setMeals] = useState([
    // Example meals, replace with dynamic data later
    { meal: "Breakfast: Eggs & Toast", calories: 400, proteins: 25, fats: 20, carbs: 30 },
    { meal: "Lunch: Chicken Salad", calories: 600, proteins: 45, fats: 30, carbs: 40 },
  ]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen justify-between">
        {/* Left side with chart */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-2 mt-6 flex justify-center">Hey! Lets see how you are doing so far...</h2>
          <NutrientChart />
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center mt-5 gap-5 justify-start">
          {/* Meals Table */}
          <MealTable meals={meals} />
          {/* Upload Form */}
          <UploadForm />

          {/* Key Takeaways */}
          <div className="key-takeaways mt-6 p-6 rounded-lg w-full">
            <h2 className="text-2xl font-bold mb-2">Key Takeaways</h2>
            <p>Gemini suggests: Increase protein intake for better muscle recovery. DO IT BRO. </p>
            <p>Consider adding more healthy fats for balanced nutrition.</p>
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
