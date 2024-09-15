"use client";

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
    <div className="min-h-screen flex flex-col">
      {/* Dark Blue Section */}
      <div
        className={`bg-blue-900 flex items-center justify-center transition-all duration-500 ease-in-out ${showContent ? 'h-0 overflow-hidden' : 'h-screen'}`}
        style={{ minHeight: '100vh' }}
      >
        <div className="bg-blue-800 p-40 border-4 border-blue-700 shadow-lg rounded-lg w-full max-w-5xl text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Welcome to NAME!</h1>
          <p className="text-white text-xl">At NAME, we believe that everyone deserves access to expert nutritional advice without the hefty price tag of a professional consultation. Our mission is to empower individuals with the tools they need to maintain a healthy lifestyle by offering top-notch, personalized guidance. With our user-friendly platform, you can track your meals, monitor your nutrient intake, and receive tailored recommendations to improve your diet—all from the comfort of your home.</p>
        </div>
      </div>

{/* Light Blue Section 
<div
  ref={contentRef}
  className={`bg-blue-300 flex flex-col items-center p-4 space-y-6 transition-all duration-500 ease-in-out ${showContent ? 'h-auto' : 'h-0 overflow-hidden'}`}
  style={{ minHeight: '100vh' }}
>
  Team Header
  <div className="w-full max-w-screen-lg text-left">
    <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center" >Meet Our Team</h2>
  </div>

 
  {[
    {
      name: 'John Doe',
      imgSrc: 'https://via.placeholder.com/100?text=John',
      description: 'John is our lead developer with expertise in React and Node.js.',
    },
    {
      name: 'Jane Smith',
      imgSrc: 'public/raghav.jpg',
      description: 'Jane is our product manager with a passion for creating great user experiences.',
    },
    {
      name: 'Samuel Lee',
      imgSrc: 'https://via.placeholder.com/100?text=Samuel',
      description: 'Samuel is a designer who brings creativity and a keen eye for detail to the team.',
    },
    {
      name: 'Sara Khan',
      imgSrc: 'https://via.placeholder.com/100?text=Sara',
      description: 'Sara is our data scientist, specializing in providing insights through data.',
    },
  ].map((member, index) => (
    <div
      key={index}
      className="flex items-center gap-4 bg-white p-6 border-2 border-blue-400 shadow-lg rounded-lg w-full max-w-screen-lg mx-auto"
      style={{ marginLeft: '155px' }}  // Manually align team member cards
    >      
    <img
        src={member.imgSrc}
        alt={`Photo of ${member.name}`}
        className="w-24 h-24 object-cover border border-blue-400 rounded-md"
      />
      <div className="flex-grow text-center">
        <h3 className="text-blue-800 text-xl font-bold">{member.name}</h3>
        <p className="text-blue-600">{member.description}</p>
      </div>
    </div>
  ))}
</div>


<button
  onClick={showContent ? handleReturnToTop : handleScroll}
  className="fixed bottom-0 left-0 right-0 p-4 bg-blue-800 text-white text-center font-bold cursor-pointer"
>
  {buttonText}
</button>
*/}


    </div>
  );
};

export default NewPage;