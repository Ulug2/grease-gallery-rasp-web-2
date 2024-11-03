'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import CustomDropzone from 'app/(dashboard)/upload/drop-zone'; // Ensure this path is correct
import React, { useState } from 'react';

//verify
const UploadPage = () => {
  return (
    <Card>
      <CardHeader style={{ textAlign: 'center' }}>
        <CardTitle>Upload</CardTitle>
        <CardDescription>Upload your images</CardDescription>
      </CardHeader>
      <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
        <CustomDropzone/>
      </CardContent>
    </Card>
  );
};

export default UploadPage;
