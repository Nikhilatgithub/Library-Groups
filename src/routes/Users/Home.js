import React from 'react';
import MediaCard from '../../components/HomeCard';
import RecordTables from '../../components/RecordTable';
import './LoginPage.css';
import { useFirebase } from '../../firebases/firebaseDB';
import AddBookPage from '../AddBooks';
import AddBookRecordPage from '../AddBookRecord';
import CreateGroupForm from '../CreateGroup';
import JoinGroupForm from '../JoinGroup';
import AddStudent from '../AddStudent';
const HomePage = () => {
  const firebase = useFirebase();
  if(firebase.user===null)
  {
    return (
    
    
      <div className='card' >
     <MediaCard />
   
     {/* <AddBookRecordPage /> */}
     {/* <CreateGroupForm /> */}
     {/* <JoinGroupForm /> */}
     {/* <AddStudent /> */}
     {/* <AddBookPage /> */}
        </div>
      
    );
  }
  else{
    return (
     
      <div className='card' >
     
     <RecordTables />
        </div>
      
    );
  }
 
};

export default HomePage;
