"use client";

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function Takeaways() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Low calorie intake, especially when consistently below what the body needs, can have negative consequences on both physical and mental well-being. When individuals consume fewer calories than their body requires, it can lead to fatigue, dizziness, and an overall decrease in energy levels. The body relies on a certain amount of calories for basic functions like maintaining body temperature, digestion, and supporting brain activity. Consistently eating below the recommended caloric intake can result in nutrient deficiencies, weakened immune function, and even metabolic imbalances. \n\n For instance, imagine a person whose daily meals included eggs and toast for breakfast, followed by a chicken salad for lunch. While these are nutritious choices, the combination may have provided fewer calories and carbohydrates than necessary to meet their body’s energy needs. Eggs and toast, while rich in protein and fiber, may not offer sufficient calories for a whole day’s start. Similarly, a chicken salad, though packed with protein and vitamins, is typically low in carbs and calories unless paired with a substantial source of energy, such as grains or healthy fats. \n\nThe problem with this reduced calorie and carbohydrate intake is that over time, it can leave someone feeling sluggish, irritable, or unable to concentrate. Carbohydrates are the body’s primary energy source, fueling everything from daily physical activities to brain function. When the body doesn’t receive enough of these vital nutrients, it begins to conserve energy by slowing metabolism and using stored fat and muscle for fuel, which can eventually lead to muscle loss and other health complications. It’s essential to maintain a balanced diet that supports the body’s energy demands to avoid these issues.";

  useEffect(() => {
    let index = 0;
    let newText = ''; // Initialize newText as an empty string
  
    const interval = setInterval(() => {
      // Ensure the index doesn't exceed the fullText length
      if (index < fullText.length) {
        newText += fullText[index]; // Append the current character to newText
        setText(newText); // Update the state with the newText
        index++;
      } else {
        clearInterval(interval); // Stop the interval when text is fully typed
        setIsTyping(false); // Stop the cursor when typing is done
      }
    }, 15); // Speed of the typing effect
  
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <Layout>
      <Navbar/>
    <div className="takeaways-section text-center">
        <h2 className="journal-title mt-10"> AI Powered Goals for you</h2>
        <p className="takeaways-text">
          {text}
          {/* Show cursor while typing */}
          {isTyping && <span className="cursor">|</span>}
        </p>
      </div>
    </Layout>
  );
}

