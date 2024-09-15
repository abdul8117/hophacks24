"use client";

import Navbar from '@/components/Navbar';
import Layout from '@/components/Layout';
import React, { useState, useEffect, useRef } from 'react';

const NewPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [buttonText, setButtonText] = useState('Show More');
  const contentRef = useRef(null);

  // Handle the scroll action to show more content
  const handleScroll = () => {
    setShowContent(true);
    setButtonText('Return to Top');
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  // Handle the scroll action to return to the top
  const handleReturnToTop = () => {
    setShowContent(false);
    setButtonText('Show More');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll event to update button text and scrolling behavior
  const handleScrollUp = () => {
    if (window.scrollY === 0 && showContent) {
      setShowContent(false);
      setButtonText('Show More');
    } else if (window.scrollY > 0 && !showContent) {
      setButtonText('Return to Top');
    }
  };

  // Add or remove no-scroll class and scroll event listener
  useEffect(() => {
    if (showContent) {
      document.body.classList.remove('no-scroll');
      window.addEventListener('scroll', handleScrollUp);
    } else {
      document.body.classList.add('no-scroll');
      window.removeEventListener('scroll', handleScrollUp);
    }

    return () => window.removeEventListener('scroll', handleScrollUp);
  }, [showContent]);

  return (
    <Layout>
      <Navbar/>
      <div className="min-h-screen flex flex-col">
      {/* Dark Blue Section */}
        <div
          className={`bg-transparent flex items-center justify-center transition-all duration-500 ease-in-out ${showContent ? 'h-0 overflow-hidden' : 'h-screen'}`}
          style={{ minHeight: '100vh' }}
        >
        <div className="bg-transparent p-40 border-4 border-blue-400 shadow-lg rounded-lg w-full max-w-5xl text-center">
          <h1 className="text-5xl font-bold mb-2">Welcome to NutriWise!</h1>
          <p className="text-xl">At NutriWise, we believe that everyone deserves access to expert nutritional advice without the hefty price tag of a professional consultation. Our mission is to empower individuals with the tools they need to maintain a healthy lifestyle by offering top-notch, personalized guidance. With our user-friendly platform, you can track your meals, monitor your nutrient intake, and receive tailored recommendations to improve your diet—all from the comfort of your home.</p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default NewPage;