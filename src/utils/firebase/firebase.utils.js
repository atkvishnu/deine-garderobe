// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// auth 
import {
    GoogleAuthProvider, getAuth,
    signInWithRedirect, signInWithPopup, signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


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


// used once when pushing data to firebase. DO NOT USE again.
// method to upload SHOP_DATA object(comprising of titles and item array) into firestore.
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);        // get the collection reference
    const batch = writeBatch(db);       // create a batch to write to firestore

    // loop through the objects to add and add each one to the batch
    objectsToAdd.forEach((object) => {  // for each object in the array, add it to the batch.
        const docRef = doc(collectionRef, object.title.toLowerCase());  // create a document reference for each object in the array
        batch.set(docRef, object); // set() method is used to add a new document to a collection.
    });

    await batch.commit();       // commit the batch to firestore.
    console.log('done');
}


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');     // get the collection named 'categories'
    const q = query(collectionRef);                 // create a query for the collectionRef

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {   // reduce the querySnapshot to a map of categories and their documents
        const { title, items } = docSnapshot.data();        // get the title and items from the document
        acc[title.toLowerCase()] = items;                   // add the title and items to the map
        return acc;                                         // return the map
    }, {})

    return categoryMap;                     // return the map
}



// additionalInformation is an object containing the additional information to be added to the user's profile.
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);  // create a document reference for the user
    // console.log("🚀userDocRef : ", { userDocRef });

    const userSnapshot = await getDoc(userDocRef);      // get the user document from firestore
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
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (error) {
            console.log('Error: Error creating the user!', error.errors.message);
        }
    }

    return userDocRef;
}


export const createUserDocumentFromRedirect = async (userAuth) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'usersFromRedirect', userAuth.uid);
    console.log("🚀userDocRef : ", { userDocRef });

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);

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
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;     // 404 kind page component
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;     // 404 kind page component
    }
    console.log(auth);
    return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);

// Observer Listener (Permanant Listener)
// onAuthStateChanged is a function that will be called when the user is signed in or out
// onAuthStateChanged takes 2 arguments: 1st one is auth, 2nd one is a callback which will be called when this auth state changes.
// as we are defining the callback as our own method, we have to pass callback as a parameter 
//     whenever we are instantiating the onAuthStateChangedListener we have to pass the callback as a parameter
//      won't work if callback is not passed as a parameter
// onAuthStateChangedListener will call this callback whenever auth singleton changes (when user signin/ signout auth changes, hance this fn. will be called) 
// this is a permanent listener and will be called everytime the auth state changes
// we have to stop this listener when we are not using it anymore (when the component is unmounted), if we don't unmount it then we will get a memory leak.
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
