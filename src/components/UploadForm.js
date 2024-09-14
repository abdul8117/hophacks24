// components/UploadForm.js
import React from 'react';

export default function UploadForm() {
  return (
    <div className="upload-form p-4 rounded-lg w-full">
      <h2 className="text-lg font-bold mb-4">Upload a Meal Picture</h2>
      <input type="file" accept="image/*" className="mb-4" />
      <button className="bg-blue-500 text-white py-2 px-4 rounded">Upload</button>
    </div>
  );
}
