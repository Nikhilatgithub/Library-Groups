import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../firebases/firebaseDB';
import { Container, Typography, Paper, Avatar } from '@mui/material';


  // Assuming you have a custom hook for Firebase authentication
 

const ProfilePage = () => {
    const firebase = useFirebase(); // Custom hook to get the current user
  const [userProfile, setUserProfile] = useState(null);
  

  useEffect(() => {
    // Fetch additional user information from Firestore or other sources if needed
    // For example, if you have a Firestore collection of user profiles:
    // const userProfileRef = firestore.collection('profiles').doc(currentUser.uid);
    // userProfileRef.get().then((doc) => {
    //   if (doc.exists) {
    //     setUserProfile(doc.data());
    //   } else {
    //     console.log('No such document!');
    //   }
    // }).catch((error) => {
    //   console.log('Error getting document:', error);
    // });
     
    // For simplicity, we'll just display the basic user information from authentication
    setUserProfile(firebase.user);
  }, []);

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper style={{ padding: '16px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src="/path/to/avatar.jpg" style={{ width: '96px', height: '96px', marginBottom: '16px', margin: 'auto' }} />
          <Typography variant="h5" align="center" gutterBottom>
          {userProfile?.displayName}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Email: {userProfile?.email}
        </Typography>
       
        </div>
      </Paper>
    </div>
    
  );
};

export default ProfilePage;
