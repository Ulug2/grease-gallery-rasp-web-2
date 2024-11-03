import React, { useState, useEffect } from 'react';
import { recognizeText } from './ocr';

const ImageToText = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement & { files: FileList }; // Type guard

    if (!input.files) {
        return; // Handle no file selected case
    }

    const file = input.files[0];

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const result = await recognizeText(e.target?.result as string);
        setText(result == null ? 'No text found' : result);
        setError(null);
      } catch (err) {
        console.error('Error processing image:', err); // Log the error for debugging
        setError(null); // Clear the error state
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {error && <p>{error}</p>}
      <p>{text}</p>
    </div>
  );
};

export default ImageToText;