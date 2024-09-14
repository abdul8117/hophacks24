// app/my-journal/page.js
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import '../globals.css';
import Layout from '@/components/Layout';

const daysInMonth = 30; // or calculate dynamically

export default function MyJournal() {
  return (
    <div>
      <Layout>
        <Navbar />
        <div className="my-journal-container">
          <h1 className="journal-title">My Journal</h1>
          <div className="journal-grid">
            {[...Array(daysInMonth)].map((_, i) => (
              <Link key={i} href={`/my-journal/${i + 1}`}>
                <div className="journal-grid-cell">
                  <p>{`Day ${i + 1}`}</p>
                  <p>Nutritional Info</p> {/* Replace with real data */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
