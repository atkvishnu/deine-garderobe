// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// auth 
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log("🚀userDocRef : ", { userDocRef });

    const userSnapshot = await getDoc(userDocRef);
    // console.log(`userSnapshot:`);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    // if user data exists
    // if user data does not exists
    // create / set the document with the data from userAuth in my collection
    // return userDocRef;

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('Error: Error creating the user!', error.message);
        }
    }

    return userDocRef;
}


export const createUserDocumentFromRedirect = async (userAuth) => {
    const userDocRef = doc(db, 'usersFromRedirect', userAuth.uid);
    console.log("🚀userDocRef : ", { userDocRef });

    const userSnapshot = await getDoc(userDocRef);
    // console.log(`userSnapshot:`);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    // if user data exists
    // if user data does not exists
    // create / set the document with the data from userAuth in my collection
    // return userDocRef;

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log('Error: Error creating the user!', error.message);
        }
    }

    return userDocRef;

}
