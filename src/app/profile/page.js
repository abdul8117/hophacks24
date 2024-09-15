"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

const ProfilePage = () => {

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Prefer Not to Disclose');
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    // Retrieve profile data from local storage
    const profileData = localStorage.getItem('profile');
    if (profileData) {
      const { height, weight, age, gender } = JSON.parse(profileData);
      setHeight(height || '');
      setWeight(weight || '');
      setAge(age || '');
      setGender(gender || 'Prefer Not to Disclose');
      setProfileExists(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data to local storage
    const profileData = { height, weight, age, gender };
    localStorage.setItem('profile', JSON.stringify(profileData));
    setProfileExists(true);
    
  };

  return (
    <Layout>
        <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile Information</h1>
        
        {!profileExists && (
          <p className="text-center text-gray-600 mb-6">Hey Raghav! Your profile isn't completed. Please fill it out to get the best personalized AI suggestions.</p>
        )}

        {profileExists && (
            <p className="text-center text-gray-600 mb-6">Hey Raghav! Your Profile is completed. You're all set to get the best personalized AI suggestions.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="height" className="text-lg font-semibold mb-1">Height (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-lg font-semibold mb-1">Weight (lbs)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="age" className="text-lg font-semibold mb-1">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-lg font-semibold mb-1">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="Prefer Not to Disclose">Prefer Not to Disclose</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default ProfilePage;