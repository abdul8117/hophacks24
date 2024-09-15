"use client";

import React, { useState } from 'react';
import API_URL from '@/utils/utils';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch(`${API_URL}/add-meal`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        if (response.ok) {
          const result = await response.json();
          console.log('File uploaded successfully:', result);
        } else {
          console.error('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error occurred while uploading:', error);
      }
    }
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
