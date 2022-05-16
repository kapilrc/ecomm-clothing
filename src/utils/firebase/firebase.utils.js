import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
 } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCGGK4rB8KdZWm8728di7VM_zdR31ZJ1KY",
  authDomain: "ecomm-clothing-db.firebaseapp.com",
  databaseURL: "https://ecomm-clothing-db.firebaseio.com",
  projectId: "ecomm-clothing-db",
  storageBucket: "ecomm-clothing-db.appspot.com",
  messagingSenderId: "370090001464",
  appId: "1:370090001464:web:7cd1894a7a65a7588212cd",
  measurementId: "G-KWCX0RHVGZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  // check the instance of user database
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,  {
        displayName, 
        email,
        createdAt
      });
    } catch (err) {
      console.error('error creating user', err)
    }
  }

  return userDocRef;
}