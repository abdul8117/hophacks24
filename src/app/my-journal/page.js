'use client';

import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

// JournalButton component for consistency
const JournalButton = ({ onClick, isEditing }) => {
  return (
    <button
      onClick={onClick}
      className= "absolute bottom-4 left-4 p-2 bg-gray-200 text-gray-700 rounded-lg opacity-60 hover:opacity-80"
      aria-label={isEditing ? 'Save changes' : 'Edit entry'}
    >
      {isEditing ? 'Enter' : 'Edit'}
    </button>
  );
};

const Journal = () => {
  const initialEntries = [
    { date: '09/09/24', calories: '500 grams', protein: '400 grams', fats: '200 grams', description: 'Had a hearty breakfast with eggs and toast.' },
    { date: '09/10/24', calories: '400 grams', protein: '200 grams', fats: '100 grams', description: 'Light salad for lunch and fish for dinner.' },
    { date: '09/11/24', calories: '350 grams', protein: '120 grams', fats: '300 grams', description: 'Skipped breakfast, but ate pasta for lunch.' },
    { date: '09/12/24', calories: '600 grams', protein: '700 grams', fats: '300 grams', description: 'Big meal with lots of chicken and veggies.' },
    { date: '09/13/24', calories: '100 grams', protein: '200 grams', fats: '300 grams', description: 'Ate very little, just had snacks throughout the day.' }
  ];

  const [entries, setEntries] = useState(initialEntries);
  const [currentIndex, setCurrentIndex] = useState(entries.length - 1);
  const [editStates, setEditStates] = useState(entries.map(() => false));
  const [todayText, setTodayText] = useState('');
  const [isEditingToday, setIsEditingToday] = useState(true);

  const handleLeftArrowClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRightArrowClick = () => {
    if (currentIndex < entries.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const toggleEdit = (index) => {
    const newEditStates = [...editStates];
    newEditStates[index] = !newEditStates[index];
    setEditStates(newEditStates);
  };

  const handleDescriptionChange = (content, index) => {
    const newEntries = [...entries];
    newEntries[index].description = content;
    setEntries(newEntries);
  };

  const handleTodayTextChange = (content) => {
    setTodayText(content);
  };

  const toggleTodayEdit = () => {
    if (isEditingToday && todayText.trim()) {
      setIsEditingToday(false);
    } else {
      setIsEditingToday(true);
    }
  };

  const getEntryContent = (entry, index) => (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col">
        <p>Calories: {entry.calories}</p>
        <p>Protein: {entry.protein}</p>
        <p>Fats: {entry.fats}</p>
        {editStates[index] ? (
          <Editor
            apiKey="kvjqyqdk8p4xrrgbw8g6ok4bzuh4nxg1a1pchnqybbz1q1en"
            value={entry.description}
            onEditorChange={(content) => handleDescriptionChange(content, index)}
            init={{
              height: 300,
              menubar: false,
              plugins: 'code',
              toolbar: 'code',
              content_css: 'https://www.tiny.cloud/css/codepen.min.css',
              forced_root_block: false,
              entity_encoding: 'raw',
              valid_elements: '*[*]',
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: entry.description.replace(/\n/g, ' ') }} // Replace new lines with spaces
            className="mt-4 italic text-handwritten"
          />
        )}
      </div>
      <div className="mt-auto flex justify-center">
        <JournalButton onClick={() => toggleEdit(index)} isEditing={editStates[index]} />
      </div>
    </div>
  );

  const currentEntry = entries[currentIndex];
  const previousEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;

  return (
    <Layout>
      <Navbar/>
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="relative w-[65%] h-[85%] max-w-5xl bg-cyan-950 rounded-lg shadow-md p-4"> {/* Added padding here */}
        <div className="absolute inset-0 border-8 border-cyan-950 rounded-lg z-0"></div>

        <div className="relative h-full w-full bg-white border border-cyan-900 shadow-lg rounded-lg">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-white border-r border-cyan-900 z-10 flex flex-col">
            <div className="flex flex-col flex-1 p-10">
              <div className="flex-1">
                {previousEntry ? getEntryContent(previousEntry, currentIndex - 1) : 'No previous entry'}
              </div>
              <button
                onClick={handleLeftArrowClick}
                className="absolute top-1/2 left-4 p-2 bg-gray-200 text-gray-700 rounded-lg opacity-60 hover:opacity-80"
                aria-label="Next entry"
              >
                &#9664;
              </button>
            </div>
            {previousEntry && (
              <div className="absolute top-4 right-4 text-lg font-bold text-black">
                {previousEntry.date}
              </div>
            )}
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full bg-white border-l border-gray-300 z-10 flex flex-col">
            <div className={`flex flex-col flex-1 p-10 ${currentIndex === entries.length - 1 ? 'justify-between' : ''}`}>
              {currentIndex === entries.length - 1 ? (
                <>
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col">
                      <p>Calories:</p>
                      <p>Protein:</p>
                      <p>Fats:</p>
                      {isEditingToday ? (
                        <Editor
                          apiKey="kvjqyqdk8p4xrrgbw8g6ok4bzuh4nxg1a1pchnqybbz1q1en"
                          value={todayText}
                          onEditorChange={handleTodayTextChange}
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: 'code',
                            toolbar: "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
                            content_css: 'https://www.tiny.cloud/css/codepen.min.css',
                            forced_root_block: false,
                            entity_encoding: 'raw',
                            valid_elements: '*[*]',
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: todayText.replace(/\n/g, ' ') }} // Replace new lines with spaces
                          className="mt-4 italic text-handwritten"
                        />
                      )}
                    </div>
                    <div className="mt-auto flex justify-center">
                      <JournalButton onClick={toggleTodayEdit} isEditing={isEditingToday} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {getEntryContent(currentEntry, currentIndex)}
                </>
              )}
              {currentIndex < entries.length - 1 && (
                <button
                  onClick={handleRightArrowClick}
                  className="absolute top-1/2 right-4 p-2 bg-gray-200 text-gray-700 rounded-lg opacity-60 hover:opacity-80"
                  aria-label="Next entry"
                >
                  &#9654;
                </button>
              )}
            </div>
            {currentIndex === entries.length - 1 ? (
              <div className="absolute top-4 right-4 text-lg text-black">
                Today
              </div>
            ) : (
              <div className="absolute top-4 right-4 text-lg font-bold text-black">
                {currentEntry.date}
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 h-full w-[2px] bg-gray-400 z-20"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gray-400 z-20"></div>

          <div className="absolute inset-y-0 left-0 w-1/2 z-5">
            <div className="absolute inset-y-0 left-1/2 w-1/2 bg-gradient-to-l from-gray-300 to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Journal;