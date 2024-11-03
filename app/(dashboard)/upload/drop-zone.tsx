"use client"; // This directive indicates that the component is a client component

import React, { useState, DragEvent } from 'react';
import { recognizeText } from '../../../lib/ocr'; // Import the OCR function
import { parseE2000, parseE76 } from '../../../lib/parser';
import { insertSearchById } from '../../../lib/db';

// Define the CustomDropzone component
const CustomDropzone: React.FC = () => {
    // State to hold the list of files dropped into the dropzone
    const [files, setFiles] = useState<File[]>([]);
    const [uploaded, setUploaded] = useState(false); // State to track upload status
    const [extractedText, setExtractedText] = useState('');

    // Handler for when files are dropped
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent the default browser behavior (e.g., opening the file)
        // Get the dropped files and convert the FileList to an array
        const droppedFiles = Array.from(event.dataTransfer.files);
        // Update the state with the new files
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    // Handler for drag over event to allow file drop
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent the default behavior to allow dropping
    };

    // Handler for file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the selected files and convert the FileList to an array
        const selectedFiles = Array.from(event.target.files || []);
        // Update the state with the new files
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };
    
    // Handler for file upload
    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Please select files to upload.");
            return;
        }

        const formData = new FormData(); // Create a FormData object to hold the files
        files.forEach(file => {
            formData.append('files', file); // Append each file to the FormData
        });

        setUploaded(true); // Set uploading state to true

        try {
            const image = formData.get('files') as File; // Get the first file from the FormData
            const text = await recognizeText(image); // Call the OCR function
            setExtractedText(text == null ? 'No text found' : text);
            // Handle text and query it into db
            const id = parseInt(files[0].name.substring(0, 5));
            const e2000String = parseE2000(text);
            const e2000 = e2000String !== undefined ? parseFloat(e2000String.toString()) : 0;
            const e76String = parseE76(text);
            const e76 = e76String !== undefined ? parseFloat(e76String.toString()) : 0;
            console.log("E2000: " + e2000);
            console.log("E76: " + e76);
            console.log("ID: " + id);
            // const value = await insertSearchById(
            //     {
            //         id: id,
            //         machine_id: "armtwo",
            //         grease_id: "10W40",
            //         standard_id: 1,
            //         test_id: 1,
            //         delta_e2000: "0",
            //         delta_e76: "0"
            //     }
            // );

        } catch (error) {
            console.error('Error extracting text:', error);
        }

        // try {
        //     const response = await fetch('/api/upload', { // Adjust the URL to your backend endpoint
        //         method: 'POST',
        //         body: formData,
        //     });

        //     if (!response.ok) {
        //         throw new Error('Upload failed');
        //     }

        //     alert('Files uploaded successfully!'); // Notify user on success
        //     setFiles([]); // Clear selected files after upload
        // } catch (error) {
        //     console.error(error);
        //     alert('An error occurred while uploading files.');
        // } finally {
        //     setUploading(false); // Reset uploading state
        // }
    };

    // Render the dropzone UI
    return (
        <div
            onDrop={handleDrop} // Attach the drop event handler
            onDragOver={handleDragOver} // Attach the drag over event handler
        >
            <div
            style={{
                border: '2px dashed #0F172A', // Style for the dropzone border
                borderRadius: '4px', // Rounded corners for the dropzone
                padding: '20px', // Inner padding
                textAlign: 'center', // Center the text
                height: '300px',
                width: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
            >
            <p>Drag and drop your files here</p> {/* Instruction text */}
            <input 
                type="file" 
                multiple // Allows multiple files to be selected
                onChange={handleFileSelect} // Attach the file selection handler
                style={{ margin: '10px auto',
                        cursor: 'pointer',
                        backgroundColor: '#EFEFEF', 
                        maxWidth: '110px',
                        borderRadius: '2px'
                    }} // Add some spacing above the button
            />
            <div>
                {/* Map through the files array and display the name of each file */}
                {files.map((file, index) => (
                    <div key={index}>{file.name}</div> // Display file name
                ))}
            </div>
            </div>
            <button onClick={handleUpload} disabled={uploaded} style={{
                    margin: '20px auto', 
                    maxWidth: '110px', 
                    backgroundColor: '#0F172A',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '2px',
                    display: 'flex',
                    justifyContent: 'center'
                 }}>
                {uploaded ? 'Uploaded' : 'Upload Files'} {/* Button text based on uploading state */}
            </button>
        </div>
    );
};

export default CustomDropzone; // Export the component for use in other files