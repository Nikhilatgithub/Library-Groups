import React, { useState } from 'react';
import './LoginPage.css';
import { Avatar, Paper } from '@mui/material';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    // Access the selected file from the event
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  // Function to handle file upload
  const handleUpload = () => {
    console.log('Selected file:', selectedFile);
    if (selectedFile) {
      // Perform upload logic here, such as sending the file to a server
      console.log('Selected file:', selectedFile);
      // Reset selected file state after upload if needed
      setSelectedFile(null);
    } else {
      console.warn('No file selected.');
    }
  };

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Paper style={{ padding: '16px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <Avatar src={selectedFile} style={{ width: '96px', height: '96px', marginBottom: '16px', margin: 'auto' }} />
         </div>
         <div style={{ textAlign: 'center', marginTop: 20 }}>
      {/* Input element for file selection */}
      <input type="file" onChange={handleFileChange} />

      {/* Button to trigger file upload */}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
      <button onClick={handleUpload}>Upload</button>

      {/* Display selected file name */}
      {/* {selectedFile && <p>Selected file: {selectedFile}</p>} */}
    </div>
         </Paper>
    
    </div>
  );
};

export default FileUploader;
