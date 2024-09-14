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
        className={`bg-blue-900 flex items-center justify-center p-12 transition-all duration-500 ease-in-out ${showContent ? 'h-0 overflow-hidden' : 'h-screen'}`}
        style={{ minHeight: '100vh' }}
      >
        <div className="bg-blue-800 p-16 border-4 border-blue-700 shadow-lg rounded-lg w-full max-w-5xl text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Hello, World!</h1>
          <p className="text-white text-xl">This is a centered box with a dark blue background and white text, made larger for better visibility.</p>
        </div>
      </div>

      {/* Light Blue Section */}
      <div
        ref={contentRef}
        className={`bg-blue-300 flex flex-col p-4 space-y-6 transition-all duration-500 ease-in-out ${showContent ? 'h-auto' : 'h-0 overflow-hidden'}`}
        style={{ minHeight: '100vh' }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 bg-white p-6 border-2 border-blue-400 shadow-lg rounded-lg w-full max-w-screen-lg mx-auto">
            <img
              src={`https://via.placeholder.com/100?text=Photo+${index + 1}`}
              alt={`Uploaded preview ${index + 1}`}
              className="w-24 h-24 object-cover border border-blue-400 rounded-md"
            />
            <div className="flex-grow text-center">
              <p className="text-blue-800 text-xl">Text Box {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button to Scroll */}
      <button
        onClick={showContent ? handleReturnToTop : handleScroll}
        className="fixed bottom-0 left-0 right-0 p-4 bg-blue-800 text-white text-center font-bold cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NewPage;