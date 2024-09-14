"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../styles/BlogEditor.module.css'; // Adjust import path as needed

const BlogEditor = ({ date }) => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  return (
    <div className={styles.editorContainer}>
      <Editor
        apiKey="l3763fgw5vfzg73ea1qkf3a1k3bdbppuhtfh9kvlprgtwzyd"  
        value={content}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor textcolor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
      <textarea
        style={{ display: 'none' }}
        value={content}
        readOnly
      />
    </div>
  );
};

export default BlogEditor;
