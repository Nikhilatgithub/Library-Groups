import React, { useState } from 'react';
import './LoginPage.css';
import { Avatar, Paper } from '@mui/material';
import { useFirebase } from '../../firebases/firebaseDB';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileImg, setSelectedFileImg] = useState(null);
  const firebase = useFirebase();

  // Function to handle file selection
  const handleFileChange = (event) => {
    // Access the selected file from the event
    // setFile(event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFile(file);
    // console.log(file);
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      
      reader.onload = () => {
        setSelectedFileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  // Function to handle file upload
  const handleUpload = async() => {
    // console.log('Selected file:', selectedFile);
    if (selectedFile) {
      // Perform upload logic here, such as sending the file to a server
       console.log('Selected file:', selectedFile);

      firebase.uploadProfile(selectedFile)
      // Reset selected file state after upload if needed
      // setSelectedFile(null);
    } else {
      console.warn('No file selected.');
    }
  };

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Paper style={{ padding: '16px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <Avatar src={selectedFileImg} style={{ width: '96px', height: '96px', marginBottom: '16px', margin: 'auto' }} />
         </div>
         <div style={{ textAlign: 'center', marginTop: 20 }}>
      {/* Input element for file selection */}
      <input type="file" onChange={handleFileChange} accept="/image/*" />

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
