"use client"; 

import React, { useState } from 'react';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('File selected:', selectedFile);
      // logic
    }
  };

  return (
    <div className="w-full md:w-3/4 lg:w-2/3 p-6 mx-auto rounded-md">
      <h2 className="text-center text-2xl font-bold mb-4">Upload Your Picture</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          name = "food-photo"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 border rounded bg-gray-50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {selectedFile && (
          <div className="mt-4 text-center">
            <p className="font-semibold">Selected File:</p>
            <p>{selectedFile.name}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadForm;
