"use client";

import Layout from '@/components/Layout';
import NutrientChart from '@/components/NutrientChart';
import UploadForm from '@/components/UploadForm';
import MealTable from '@/components/MealTable';
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';


export default function Home() {
  const [meals, setMeals] = useState([
    // Example meals, replace with dynamic data later
    { meal: "Breakfast: Eggs & Toast", calories: 400, proteins: 25, fats: 20, carbs: 30 },
    { meal: "Lunch: Chicken Salad", calories: 600, proteins: 45, fats: 30, carbs: 40 },
  ]);

  const { user, error, isLoading } = useUser();
  
  if (user) {
    return (
      <Layout>
        <Navbar />
        <div className="flex flex-col md:flex-row min-h-screen justify-between">
          {/* Left side with chart */}
          <div className="w-full md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-2 mt-6 flex justify-center">Hey {user.name}! Lets see how you're doing so far...</h2>
            <NutrientChart />
          </div>
  
          {/* Right side with form */}
          <div className="w-full md:w-1/2 p-6 flex flex-col items-center mt-6 gap-5 justify-start">
            {/* Meals Table */}
            <MealTable meals={meals} />
  
            {/* Upload Form */}
            <UploadForm />
  
            {/* Key Takeaways */}
            <div className="key-takeaways mt-4 p-6 rounded-lg w-full">
              <h2 className="text-2xl font-bold mb-2">Key Takeaways</h2>
              <p>Increase protein intake for better muscle recovery. </p>
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
  } else {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-white">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">NutriWise</h1>
        <p className="text-center text-gray-600 mb-6">Please log in or sign up to continue.</p>
        <div className="flex flex-col items-center">
          {user ? (
            <div className="text-center">
              <p className="text-lg mb-4">Welcome back, <span className="font-semibold">{user.name}</span>!</p>
              <Link href="/api/auth/logout">
                <a className="text-blue-600 hover:underline text-lg">Logout</a>
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-lg">You are not logged in. Please choose an option below:</p>
              <Link href="/api/auth/login" className="block bg-blue-600 text-white py-3 px-6 rounded-lg text-lg mb-4 hover:bg-blue-700 transition duration-300">
                Login
              </Link>
              <Link href="/api/auth/signup" className="block bg-green-600 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-700 transition duration-300">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  };

}
