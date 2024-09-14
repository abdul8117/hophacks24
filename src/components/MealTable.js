// components/MealTable.js
import React from 'react';

export default function MealTable({ meals }) {
  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
  const totalProteins = meals.reduce((total, meal) => total + meal.proteins, 0);
  const totalFats = meals.reduce((total, meal) => total + meal.fats, 0);
  const totalCarbs = meals.reduce((total, meal) => total + meal.carbs, 0);

  return (
    <div className="meal-table w-full mb-6">
      <h2 className="text-2xl font-bold mb-4">Meals of the Day</h2>
      {meals.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Meal</th>
              <th>Calories</th>
              <th>Proteins (g)</th>
              <th>Fats (g)</th>
              <th>Carbs (g)</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr key={index} className="border-b">
                <td>{meal.meal}</td>
                <td>{meal.calories}</td>
                <td>{meal.proteins}</td>
                <td>{meal.fats}</td>
                <td>{meal.carbs}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td>Total</td>
              <td>{totalCalories}</td>
              <td>{totalProteins}</td>
              <td>{totalFats}</td>
              <td>{totalCarbs}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data to show today.</p>
      )}
    </div>
  );
}
