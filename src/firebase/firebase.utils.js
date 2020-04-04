import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCGGK4rB8KdZWm8728di7VM_zdR31ZJ1KY",
  authDomain: "ecomm-clothing-db.firebaseapp.com",
  databaseURL: "https://ecomm-clothing-db.firebaseio.com",
  projectId: "ecomm-clothing-db",
  storageBucket: "ecomm-clothing-db.appspot.com",
  messagingSenderId: "370090001464",
  appId: "1:370090001464:web:f6cf0c7620d356868212cd",
  measurementId: "G-EQTYV6MDBQ"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(err) {
      console.log('error creating user ', err.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google Authentication utility
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prmopt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase