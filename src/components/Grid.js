"use client"; // Ensure this is a client component

import React from 'react';
import styles from '../styles/Grid.module.css';  

const dates = ['2024-09-01', '2024-09-02', /* Add more dates */];
const nutritionalInfo = {
  '2024-09-01': { calories: 2000, proteins: 150, carbs: 250 },
  '2024-09-02': { calories: 2200, proteins: 160, carbs: 270 },
  // Add more nutritional information
};

const Grid = ({ onSelectDate }) => {
  return (
    <div className={styles.grid}>
      {dates.map(date => (
        <div
          key={date}
          className={styles.gridCell} // Apply the style
          onClick={() => onSelectDate(date)}
        >
          <p>{date}</p>
          <p>Calories: {nutritionalInfo[date]?.calories}</p>
          <p>Proteins: {nutritionalInfo[date]?.proteins}</p>
          <p>Carbs: {nutritionalInfo[date]?.carbs}</p>
        </div>
      ))}
    </div>
  );
};

export default Grid;
