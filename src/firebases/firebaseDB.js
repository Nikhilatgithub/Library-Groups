// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  createContext, useContext, useState } from "react";
import { getDownloadURL, getStorage, ref , uploadBytes, uploadString} from "firebase/storage";
import { getAuth ,signOut,onAuthStateChanged,signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile} from "firebase/auth";
import {  doc,setDoc, getFirestore,collection, query, addDoc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import Book from "./BookDAO"
import { useNavigate } from "react-router-dom";

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
  measurementId: "G-MSWW0JKNGH",
  // storageBucket: "gs://library-group-iacsd.appspot.com"
};
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



const firestore = getFirestore(app);   //returns the firestore instance
const getFirestoreData=()=>
{
 return firestore;
};

//firestore storage code
const storage = getStorage();



//firebase authentication code;
const auth = getAuth(app);
//let grpId = 0;//group id of login student;



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
  const [user,setUser] = useState(null);
  const [grpId, setGrpId] = useState(0);
  let UserProfilePhoto="";

  const year = getCurrentYear();
 
  const addNewGroup = async(groupId) => {
    // const Collection = firestore.CollectionReference('groups');
    //  const customId = ''+getCurrentMonthID();
   
   // Add a document with the custom ID
   //   Collection.doc(customId).set({
   //   // Your document data here
   //    groupId: groupId,
   //    numberOfStudents: numStudents
   
   // })
   await setDoc(doc(firestore, "groups", groupId), {
     groupId: groupId,
   }).then(function() {
    alert('Group Created');
  });
     
   };

 //upload profile to firestore storage

 const uploadProfile = async(file) => {
  if(file!=null)
  {
    const storageRef = ref(storage, `library/img/profile/${user.email}.jpg`);
    // const storageRef = ref(storage, `/files/${file.name}`);
   
          // progress can be paused and resumed. It also exposes progress updates.
          // Receives the storage reference and the file to upload.
          // const uploadTask = uploadBytesResumable(storageRef, file);
          uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        updateUserProfilePhoto(user.email,url);
       
        alert('Uploaded a profile photo!');
    });
      
    });
  }
  else{
    alert("No image selected");
  }
  
 };





   const addNewStudent = async(group,studentName,prnNumber,email) => {
    // const Collection = firestore.CollectionReference('groups');
    // addDoc(collection(firestore, "students_"+year,email), {
    await setDoc(doc(firestore, "students_"+year, email), {
     'groupid': group,
     'name': studentName,
     'prnNumber': prnNumber,
   }).then(function() {
    alert('Student Added');
    addNewGroup(group);
  }); 
   };

   const getStudentData = async ()=>{
    const docRef = doc(firestore, "students_"+year, user.email);
    const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    alert("No such document!");
    return null;
  }
   };

   const getBookRecord = async()=>{
    try {
      const subcollectionData = [];
      // console.log(grpId);
      
        const querySnapshot = await getDocs(collection(firestore, "groups", grpId, "records"));
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         subcollectionData.push({
            studentName: doc.data().studentName,
            prnNumber: doc.data().prnNumber,
            date: doc.data().date,
            bookName: doc.data().bookName,
            bookId: doc.data().bookId,
            lastStudent: doc.data().lastStudent
        });
        });
    
      
     
      return subcollectionData;
    } catch (error) {
      alert("Error getting subcollection data:", error);
      return [];
    }
   };

const addNewRecord = async(studentName,prnNumber,date,bookName,bookId,lastStudent) => {
    // const Collection = firestore.CollectionReference('groups');
    try {
      console.log(grpId);
      const parentDocumentRef = doc(firestore, "groups", grpId);
      const subcollectionRef = collection(parentDocumentRef,"records");
      await addDoc(subcollectionRef, {
        studentName: studentName,
        prnNumber: prnNumber,
        date: date,
        bookName: bookName,
        bookId: bookId,
        lastStudent: lastStudent
     });
     alert("New Record added successfully!");
    } catch (error) {
      alert("Error adding subdocument:", error);
    }
   
   
   };

   const getStudentToGroupRecord = async()=>{
    try {
      const subcollectionData = [];
      console.log(grpId);
      const querySnapshot = await getDocs(collection(firestore, "groups", grpId, "student"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     subcollectionData.push({
        studentName: doc.data().studentName,
        prnNumber: doc.data().prnNumber
    });
    });

      return subcollectionData;
    } catch (error) {
      alert("Error getting subcollection data:", error);
      return [];
    }
   };

   const addNewStudentToGroup = async(studentName,prnNumber) => {
    // const Collection = firestore.CollectionReference('groups');
    try {
      console.log(grpId);
      const parentDocumentRef = doc(firestore, "groups", grpId);
     
      const subcollectionRef = collection(parentDocumentRef,"student");
      // await addDoc(subcollectionRef, {
        setDoc(doc(subcollectionRef,prnNumber),{
        studentName: studentName,
        prnNumber: prnNumber,
     });
     alert("student to group added successfully!");
    } catch (error) {
      alert("Error adding subdocument:", error);
    }
   
   
   };


   const addNewBook = async(book_name,book_id) => {
   
      try {
      const parentDocumentRef = doc(firestore, "groups", grpId);
      const subcollectionRef = collection(parentDocumentRef,"books");
      // await addDoc(subcollectionRef, {
        setDoc(doc(subcollectionRef,book_id),{
        bookname: book_name,
        bookid: book_id,
        assign: false
    });
      alert("Book added successfully!");
    } catch (error) {
      alert("Error adding subdocument:", error);
    }
    
   };

   const getGroupId = async(email) => { //call in login to get students group id;
   
    const docRef = doc(firestore, "students_"+year, email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Grooupid:", docSnap.data().groupid);
      // grpId=docSnap.data().groupid;
      setGrpId(docSnap.data().groupid);
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    
//   

  }; 
  
  const getBooks = async() => {
  
    try {
      const subcollectionData = [];
      console.log(grpId);
      const querySnapshot = await getDocs(collection(firestore, "groups", grpId, "books"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     subcollectionData.push({
        bookName: doc.data().bookname,
        bookId: doc.data().bookid,
        assign: doc.data().assign
    });
    });

      return subcollectionData;
    } catch (error) {
      console.error("Error getting subcollection data:", error);
      return [];
    }
  }; 

  const getNotAssignBooks = async() => {
  
    try {
      const subcollectionData = [];
      console.log(grpId);
      const querySnapshot = await getDocs(collection(firestore, "groups", grpId, "books"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
     console.log(doc.id, " => ", doc.data());
     if (!doc.data().assign) {
      // Add data to subcollectionData only if assign is true
      subcollectionData.push({
          bookName: doc.data().bookname,
          bookId: doc.data().bookid,
          assign: doc.data().assign
      });
     }
    });

      return subcollectionData;
    } catch (error) {
      console.error("Error getting subcollection data:", error);
      return [];
    }
  }; 

  const updateBookAssignStatus = async (bookId) => {
    try {
        // Reference to the specific book document
        const bookRef = doc(firestore, "groups", grpId, "books", bookId);
        
        // Update the assign property to true
        await updateDoc(bookRef, {
            assign: true
        });

        console.log("Book assign status updated successfully.");
    } catch (error) {
        console.error("Error updating book assign status:", error);
    }
};

//get user profile photo link

const getUserProfilePhoto = async(email) => { //
   
  const docRef = doc(firestore, "students_"+year, email);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("photoLink:", docSnap.data().photoLink);
    UserProfilePhoto=docSnap.data().photoLink;
    // setUserProfilePhoto(docSnap.data().photoLink);
  } else {

    console.log("No such document!");
  }
  
//   

}; 

//update user profile photo

const updateUserProfilePhoto = async (email,link) => {
  try {
      // Reference to the specific book document
      const photoRef = doc(firestore, "students_"+year, email);
      
      // Update the assign property to true
      await updateDoc(photoRef, {
          photoLink: link
      });

      console.log("Book assign status updated successfully.");
  } catch (error) {
      console.error("Error updating book assign status:", error);
  }
};
  
   const signInUser=(email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
       getGroupId(email);
       getUserProfilePhoto(email);
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
        addNewStudent(group,studentName,prnNumber,email);
        addNewStudentToGroup(studentName,prnNumber);
        const auth = getAuth();
        // getUserProfilePhoto(email);
        //email verification link;
        sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Email verification link send please verify");
        });
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

const sendEmailVerificationlink = () =>{
  const auth = getAuth();

  //email verification link;
  sendEmailVerification(auth.currentUser)
  .then(() => {
    alert("Email verification link send please verify");
  });
};

  const userPassReset=(email)=>{

    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      // ..
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



  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      // console.log(user.email);
      getGroupId(user.email);
      getUserProfilePhoto(user.email);
      
    // setStudent(data);
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
      grpId,  
      UserProfilePhoto,  
      signOutUser,
      getAuthentication,
      getGroupId,
      getUserProfilePhoto,
      addNewRecord,
      getBookRecord,
      getStudentData,
      getStudentToGroupRecord,
      addNewStudentToGroup,
      getNotAssignBooks,
      updateBookAssignStatus,
      userPassReset,
      sendEmailVerificationlink,
      uploadProfile,
    }}>
        {props.children}
    </FirebaseContext.Provider>
}