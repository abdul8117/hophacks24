import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="blurry-ball bg-gradient-to-r from-blue-300 to-white"></div>
          <div className="blurry-ball delay-1 bg-gradient-to-r from-blue-300 to-white"></div>
          <div className="blurry-ball delay-2 bg-gradient-to-r from-blue-300 to-white"></div>
          <div className="blurry-ball delay-3 bg-gradient-to-r from-blue-300 to-white"></div> {/* New ball */}
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
