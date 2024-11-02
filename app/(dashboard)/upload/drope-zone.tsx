"use client"; // This directive indicates that the component is a client component

import React, { useState, DragEvent } from 'react';

// Define the CustomDropzone component
const CustomDropzone: React.FC = () => {
    // State to hold the list of files dropped into the dropzone
    const [files, setFiles] = useState<File[]>([]);

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

    // Render the dropzone UI
    return (
        <div
            onDrop={handleDrop} // Attach the drop event handler
            onDragOver={handleDragOver} // Attach the drag over event handler
            style={{
                border: '2px dashed #0070f3', // Style for the dropzone border
                borderRadius: '4px', // Rounded corners for the dropzone
                padding: '20px', // Inner padding
                textAlign: 'center', // Center the text
                cursor: 'pointer', // Change cursor to pointer when hovering
                display: 'flex', // Use flexbox for layout
                flexDirection: 'column', // Stack elements vertically
                alignItems: 'center', // Center children horizontally
            }}
        >
            <p>Drag and drop your files here</p> {/* Instruction text */}
            <input 
                type="file" 
                multiple // Allows multiple files to be selected
                onChange={handleFileSelect} // Attach the file selection handler
                style={{ marginTop: '10px', marginLeft: '120px' }} // Add some spacing above the button
            />
            <div>
                {/* Map through the files array and display the name of each file */}
                {files.map((file, index) => (
                    <div key={index}>{file.name}</div> // Display file name
                ))}
            </div>
        </div>
    );
};

export default CustomDropzone; // Export the component for use in other files