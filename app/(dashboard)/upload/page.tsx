'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import CustomDropzone from 'app/(dashboard)/upload/drop-zone'; // Ensure this path is correct
import React from 'react';

const UploadPage = () => {
  return (
    <div className="flex justify-center items-center min-h-2xl bg-gray-100 p-4">
      <Card className="max-w-6xl w-full shadow-lg rounded-lg p-8 bg-white">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-4xl font-bold text-gray-800">Upload</CardTitle>
          <CardDescription className="text-lg text-gray-500">
            Upload your grease sample images for analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center">
          <CustomDropzone />
          <CardDescription className="text-center text-sm text-gray-400 mt-4">
            Supported formats: PNG, JPG, BMP
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadPage;