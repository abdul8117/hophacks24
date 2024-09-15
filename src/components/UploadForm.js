"use client";

// import React, { useState } from 'react';

// const UploadForm = ({addLunch, addNewText}) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const sleep = ms => new Promise(r => setTimeout(r, ms));

//   const handleUpload = async (e) => {
//     // e.preventDefault();
//     await sleep(1450);
//     addLunch();
//     await sleep(500);
//     addNewText();
//   };

//   return (
//     <div className="upload-form p-4 rounded-lg w-full">
//       <h2 className="text-2xl font-bold mb-4">Upload a Meal Picture</h2>
//       <input 
//         type="file" 
//         accept="image/*" 
//         className="mb-4" 
//         onChange={handleFileChange} 
//       />
//       <button 
//         className="bg-blue-500 text-white py-2 px-4 rounded" 
//         onClick={handleUpload}
//       >
//         Upload
//       </button>
//     </div>
//   );
// };

// export default UploadForm;

import React, { useState } from 'react';

const UploadForm = ({ addLunch, addNewText, updateChart }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handleUpload = async () => {
    await sleep(1450);
    addLunch();
    await sleep(500);
    addNewText();
    updateChart(); // Ensure this is called to update the chart with new values
  };

  return (
    <div className="upload-form p-4 rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Upload a Meal Picture</h2>
      <input 
        type="file" 
        accept="image/*" 
        className="mb-4" 
        onChange={handleFileChange} 
      />
      <button 
        className="bg-blue-500 text-white py-2 px-4 rounded" 
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadForm;

