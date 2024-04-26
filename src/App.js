
import React, { useEffect } from 'react';
import './App.css';
import RegistrationForm from './routes/Users/Register';
import LoginPage from './routes/Users/login';
import HomePage from './routes/Users/Home';
import About from './routes/About';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarCustom from './components/Navbar';
import AddBookRecordPage from './routes/AddBookRecord';
import ProfilePage from './routes/Users/ProfilePage';
import AddStudent from './routes/AddStudent';
import AddBookPage from './routes/AddBooks';
import { useFirebase } from './firebases/firebaseDB';
import FileUploader from './routes/Users/ProfileImgUpload';


function App() {
  const firebase = useFirebase();
  useEffect(() => {
    // Function to log out the user
    const logoutUser = () => {
      // Your logout logic here
      firebase.signOutUser();
      console.log('User logged out');
    };

    // Add event listener for when the component unmounts
    window.addEventListener('beforeunload', logoutUser);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', logoutUser);
    };
  }, []); // 

  return (
    
    <Router className="bg-component">
      <NavbarCustom />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/addrecord" element={<AddBookRecordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addBooks" element={<AddBookPage />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/UserProfileImg" element={<FileUploader />} />
      </Routes>
    </Router>
      
      
  
  );
}

export default App;
