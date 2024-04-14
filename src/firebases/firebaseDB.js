// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  createContext, useContext, useState } from "react";
import { getAuth ,signOut,onAuthStateChanged,signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {  doc,setDoc, getFirestore,collection, query, addDoc, getDocs } from "firebase/firestore";
import Book from "./BookDAO"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSjH0svCSlTAuIjRG8itCDb3-o2SAvQAI",
  authDomain: "library-group-iacsd.firebaseapp.com",
  projectId: "library-group-iacsd",
  storageBucket: "library-group-iacsd.appspot.com",
  messagingSenderId: "548992600009",
  appId: "1:548992600009:web:0bb72ec73bbf7bc2f10a18",
  measurementId: "G-MSWW0JKNGH"
};
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



const firestore = getFirestore(app);
const getFirestoreData=()=>
{
 return firestore;
};

const auth = getAuth(app);
const grpId = 0;

const getCurrentMonthID = () => {
  const currentDate = new Date();
  const m=currentDate.getMonth() + 1;// Adding 1 because getMonth() returns zero-based index
  return currentDate.getFullYear()+''+''+m; 
};


const getCurrentYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear(); 
};


export const FirebaseProvider = (props) =>{
  const customId = ''+getCurrentMonthID();
  const year = getCurrentYear();
  const addNewGroup = async(groupId,numStudents) => {
    // const Collection = firestore.CollectionReference('groups');
    //  const customId = ''+getCurrentMonthID();
   
   // Add a document with the custom ID
   //   Collection.doc(customId).set({
   //   // Your document data here
   //    groupId: groupId,
   //    numberOfStudents: numStudents
   
   // })
   await setDoc(doc(firestore, "groups", customId+groupId), {
     groupId: groupId,
     numberOfStudents: numStudents
   }).then(function() {
    alert('Group Created');
  });
     
   };

   const addNewStudent = async(group,studentName,prnNumber) => {
    // const Collection = firestore.CollectionReference('groups');
    addDoc(collection(firestore, "students_"+year), {
     'groupid': group,
     'name': studentName,
     'prnNumber': prnNumber,
   }).then(function() {
    alert('Student Added');
  });
   
     
   };

   const addNewBook = async(book_name,book_id) => {
    // const Collection = firestore.CollectionReference('groups');
    addDoc(collection(firestore, "books_"+customId), {
      bookname: book_name,
     bookid: book_id,
     assign: false
   }).then(function() {
    alert('Book Added');
  });
   
     
   };

   const getGroupId = async() => {
  
    let gid = 0;
    const q = query(collection(firestore, "students_"+year));
    const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {
        
          const d =doc.data();
         
         arrayOfClassObjects.push({'name':d.bookname, 'id':d.bookid});
      });
      // console.log(arrayOfClassObjects)
    
//   
 return gid;
  }; 
  
  const getBooks = async() => {
  
    // const q = query(collection(firestore, "books_"+customId));

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    const arrayOfClassObjects = [];
    const q = query(collection(firestore, "books_"+customId));
    const querySnapshot = await getDocs(q);
    
      querySnapshot.forEach((doc) => {
        
          const d =doc.data();
         
         arrayOfClassObjects.push({'name':d.bookname, 'id':d.bookid});
      });
      // console.log(arrayOfClassObjects)
    
//   
 return arrayOfClassObjects;
  }; 
  
   const signInUser=(email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };
  
  
  const getAuthentication=()=>{

    return auth;
   };

   const signUpUser = (email,password,group,studentName,prnNumber) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      if(user===null)
      {
         alert("Not Register!!");
      }
      else{
        addNewStudent(group,studentName,prnNumber);
      }
      

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
  };

  const signOutUser=()=>{

    signOut(auth);
  };

  const [user,setUser] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // const uid = user.uid;
      // ...
    } else {
      setUser(null);
      // User is signed out
      // ...
    }
  });

    return <FirebaseContext.Provider 
    value={{
      addNewGroup,
      addNewBook,
      getBooks,
      getFirestoreData,
      signInUser,
      signUpUser,
      user,
      signOutUser,
      getAuthentication,
    }}>
        {props.children}
    </FirebaseContext.Provider>
}