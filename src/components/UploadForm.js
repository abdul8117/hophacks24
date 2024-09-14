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
    <div className="upload-form p-4 rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Upload a Meal Picture</h2>
      <input type="file" accept="image/*" className="mb-4" />
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Upload</button>
    </div>
  );
}

export default UploadForm;