"use client"; // Ensure client-side rendering

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import getMealsData from '@/utils/GetMealData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutrientChart = () => {
  const [selectedNutrient, setSelectedNutrient] = useState('calories');
  const [mealData, setMealData] = useState([]);
  const [nutrientData, setNutrientData] = useState({
    calories: [],
    proteins: [],
    carbs: [],
    fats: []
  });

  useEffect(() => {
    // Fetch meal data from the backend
    getMealsData().then((data) => {
      setMealData(data);

      // Process the fetched data to calculate nutrients per day
      const processedData = processMealData(data);
      setNutrientData(processedData);
    });
  }, []);

  // Function to process the meal data
  const processMealData = (meals) => {
    // Create an object to accumulate the total nutrients per day
    const nutrientsPerDay = {
      calories: [],
      proteins: [],
      carbs: [],
      fats: []
    };

    const groupedByDate = {};

    // Group meals by date
    meals.forEach(meal => {
      const mealDate = new Date(meal.mealDate).toDateString();

      if (!groupedByDate[mealDate]) {
        groupedByDate[mealDate] = {
          calories: 0,
          proteins: 0,
          carbs: 0,
          fats: 0
        };
      }

      // Sum up nutrients for each food in the meal
      meal.foods.forEach(food => {
        groupedByDate[mealDate].calories += food.calories * food.quantity;
        groupedByDate[mealDate].proteins += food.protein * food.quantity;
        groupedByDate[mealDate].carbs += food.carbohydrates * food.quantity;
        groupedByDate[mealDate].fats += food.fat * food.quantity;
      });
    });

    // Populate nutrientsPerDay with the aggregated data
    for (const date in groupedByDate) {
      nutrientsPerDay.calories.push(groupedByDate[date].calories);
      nutrientsPerDay.proteins.push(groupedByDate[date].proteins);
      nutrientsPerDay.carbs.push(groupedByDate[date].carbs);
      nutrientsPerDay.fats.push(groupedByDate[date].fats);
    }

    return nutrientsPerDay;
  };

  const data = {
    labels: Object.keys(nutrientData[selectedNutrient]), // You can replace this with dynamic labels (e.g., Day 1, Day 2, etc.)
    datasets: [
      {
        label: selectedNutrient.charAt(0).toUpperCase() + selectedNutrient.slice(1),
        data: nutrientData[selectedNutrient],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Nutrient Intake (${selectedNutrient.charAt(0).toUpperCase() + selectedNutrient.slice(1)})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Dropdown event handler
  const handleChange = (event) => {
    setSelectedNutrient(event.target.value);
  };

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 h-[500px] p-4 mx-auto">
      <div className="flex justify-center mb-4">
        <select
          className="p-2 border rounded bg-white text-black"
          value={selectedNutrient}
          onChange={handleChange}
        >
          <option value="calories">Calories</option>
          <option value="proteins">Proteins</option>
          <option value="carbs">Carbs</option>
          <option value="fats">Fats</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default NutrientChart;
