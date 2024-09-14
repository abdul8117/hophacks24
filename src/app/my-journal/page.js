"use client"

import React, { useState } from 'react';
import Grid from '../../components/Grid';  
import BlogEditor from '../../components/BlogEditor';  
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

const MyJournal = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <Layout>
      <Navbar />
      <div className="main-content">
        <h1>My Journal</h1>
        <Grid onSelectDate={setSelectedDate} />
        {selectedDate && (
          <div className="blog-section">
            <h2>Notes for {selectedDate}</h2>
            <BlogEditor date={selectedDate} />
          </div>
        )}
      </div>
      </Layout>
    </div>
  );
};

export default MyJournal;
