"use client"; // Ensure client-side rendering

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
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

  // Nutrient data
  const nutrientData = {
    calories: [2000, 1800, 2200, 2500, 2100, 2300, 1900],
    proteins: [90, 100, 80, 110, 95, 105, 85],
    carbs: [300, 280, 320, 330, 310, 350, 290],
    fats: [70, 65, 80, 75, 85, 90, 60],
  };

  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
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
