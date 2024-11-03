'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import CustomDropzone from 'app/(dashboard)/upload/drope-zone'; // Ensure this path is correct
import { recognizeText } from '../../../lib/ocr'; // Import the OCR function
import React, { useState } from 'react';

//verify
const UploadPage = () => {
  const [extractedText, setExtractedText] = useState('');

  const handleImageUpload = async (file) => {
    try {
      const text = await recognizeText(file);
      setExtractedText(text);
    } catch (error) {
      console.error('Error extracting text:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <Card>
      <CardHeader style={{ textAlign: 'center' }}>
        <CardTitle>Upload</CardTitle>
        <CardDescription>Upload your images</CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
        <CustomDropzone onImageUpload={handleImageUpload} />
        <textarea value={extractedText} readOnly />
      </CardContent>
    </Card>
  );
};

export default UploadPage;
