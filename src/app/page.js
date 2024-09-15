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

  let authenticatd = false;

  // useEffect(() => {
  //   fetch(`${API_URL}/validate-session`, {
  //     method: "POST",
  //     credentials: "include",
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         authenticatd = true;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Layout>
      {/* {authenticatd ? (
        <HomePage />
      ) : (
        //<Auth /> // TODO
        null
      )} */}

      <HomePage />
    </Layout>
  );
}
