"use client"; 

import React, { useEffect, useState } from 'react';
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutrientChart = ({ nutrientData }) => {
  const [selectedNutrient, setSelectedNutrient] = useState('calories');

  // Ensure data for the selected nutrient is defined
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: selectedNutrient.charAt(0).toUpperCase() + selectedNutrient.slice(1),
        data: nutrientData[selectedNutrient] || [], // Default to empty array if not found
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
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default NutrientChart;
