"use client";

import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

export default function Takeaways() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Gemini suggests: Increase protein intake for better muscle recovery. Consider adding more healthy fats for balanced nutrition.";

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
    }, 20); // Speed of the typing effect
  
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <Layout>
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

