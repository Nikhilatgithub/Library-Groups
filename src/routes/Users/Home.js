import React from 'react';
import MediaCard from '../../components/HomeCard';
import RecordTables from '../../components/RecordTable';
import './LoginPage.css';
import AddBookPage from '../AddBooks';
import AddBookRecordPage from '../AddBookRecord';
import CreateGroupForm from '../CreateGroup';
import JoinGroupForm from '../JoinGroup';
import AddStudent from '../AddStudent';
const HomePage = () => {

  return (
    
    
    <div className='card' >
   {/* <MediaCard /> */}
   {/* <RecordTables /> */}
   {/* <AddBookRecordPage /> */}
   {/* <CreateGroupForm /> */}
   {/* <JoinGroupForm /> */}
   {/* <AddStudent /> */}
   <AddBookPage />
      </div>
    
  );
};

export default HomePage;
