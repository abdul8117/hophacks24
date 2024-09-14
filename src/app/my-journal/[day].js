// // app/my-journal/[day].js
// import { useRouter } from 'next/router';
// import { Editor } from '@tinymce/tinymce-react';
// import React, { useState } from 'react';
// import Link from 'next/link';

// // export default function DayPage() {
// //   const router = useRouter();
// //   const { day } = router.query;
// //   const [notes, setNotes] = useState('');

// //   const handleEditorChange = (content) => {
// //     setNotes(content);
// //   };

// //   return (
// //     <div className="day-page-container">
// //       <h1>Day {day} - Nutritional Data</h1>
// //       <p>Calories: 2000 kcal</p> {/* Replace with dynamic data */}
// //       <p>Proteins: 50g</p> {/* Replace with dynamic data */}
// //       <p>Carbs: 250g</p> {/* Replace with dynamic data */}
// //       <p>Fats: 80g</p> {/* Replace with dynamic data */}

// //       <div className="editor-container">
// //         <h2>Notes</h2>
// //         <Editor
// //           value={notes}
// //           init={{
// //             height: 300,
// //             menubar: false,
// //             plugins: 'link image code',
// //             toolbar:
// //               'undo redo | bold italic | alignleft aligncenter alignright | code',
// //           }}
// //           onEditorChange={handleEditorChange}
// //         />
// //       </div>

// //       <div className="navigation-arrows">
// //         <Link href={`/my-journal/${parseInt(day) - 1}`} passHref>
// //           <a className="arrow left-arrow">← Previous Day</a>
// //         </Link>
// //         <Link href={`/my-journal/${parseInt(day) + 1}`} passHref>
// //           <a className="arrow right-arrow">Next Day →</a>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

// export default function DayPage({ day, nutritionalData }) {
//     const router = useRouter();
//     const [notes, setNotes] = useState('');
  
//     useEffect(() => {
//       console.log('Router query:', router.query);
//       console.log('Day:', day);
//     }, [router.query, day]);
  
//     const handleEditorChange = (content) => {
//       setNotes(content);
//     };
  
//     if (!router.isReady) {
//       return <div>Loading...</div>; // Add this to prevent undefined `day` during initial render
//     }
  
//     return (
//       <div className="day-page-container">
//         <h1>Day {day} - Nutritional Data</h1>
//         <p>Calories: {nutritionalData.calories} kcal</p>
//         <p>Proteins: {nutritionalData.proteins}g</p>
//         <p>Carbs: {nutritionalData.carbs}g</p>
//         <p>Fats: {nutritionalData.fats}g</p>
  
//         <div className="editor-container">
//           <h2>Notes</h2>
//           <Editor
//             value={notes}
//             init={{
//               height: 300,
//               menubar: false,
//               plugins: 'link image code',
//               toolbar:
//                 'undo redo | bold italic | alignleft aligncenter alignright | code',
//             }}
//             onEditorChange={handleEditorChange}
//           />
//         </div>
  
//         <div className="navigation-arrows">
//           <Link href={`/my-journal/${parseInt(day, 10) - 1}`} passHref>
//             <a className="arrow left-arrow">← Previous Day</a>
//           </Link>
//           <Link href={`/my-journal/${parseInt(day, 10) + 1}`} passHref>
//             <a className="arrow right-arrow">Next Day →</a>
//           </Link>
//         </div>
//       </div>
//     );
//   }
  
  

// export async function getStaticPaths() {
//     // Create paths for days 1-30
//     const paths = Array.from({ length: 30 }, (_, i) => ({
//       params: { day: (i + 1).toString() },
//     }));
  
//     return {
//       paths,
//       fallback: "blocking"
//     };
//   }
  

//   export async function getStaticProps({ params }) {
//     // Simulate fetching nutritional data for the selected day
//     const nutritionalData = {
//       calories: 2000 + parseInt(params.day, 10),
//       proteins: 50 + parseInt(params.day, 10),
//       carbs: 250 + parseInt(params.day, 10),
//       fats: 80 + parseInt(params.day, 10),
//     };
  
//     return {
//       props: {
//         day: params.day,
//         nutritionalData,
//       },
//     };
//   }
  
// app/my-journal/[day].js

export async function getStaticPaths() {
    const paths = Array.from({ length: 30 }, (_, i) => ({
      params: { day: (i + 1).toString() }, // `day` should be a string
    }));
  
    return {
      paths,
      fallback: false, // This ensures only 30 routes are generated, and others show 404
    };
  }
  
  export async function getStaticProps({ params }) {
    // Simulate fetching nutritional data for the selected day
    const nutritionalData = {
      calories: 2000 + parseInt(params.day, 10),
      proteins: 50 + parseInt(params.day, 10),
      carbs: 250 + parseInt(params.day, 10),
      fats: 80 + parseInt(params.day, 10),
    };
  
    return {
      props: {
        day: params.day,
        nutritionalData,
      },
    };
  }
  