import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {


    // our website redirected us entirely to a new separate domain. When we came back. Our website does not know that there was some previous instant of state of this website that we were being paused for.
    // When you navigate away from a URL, the website thinks, I'm going to unmount the entire application.
    // When we came back, we essentially reinitialize our entire application from the start from scratch, meaning that any previously held functions that we were perhaps in the middle of doesn't matter anymore.
    // There's no way to continue from there.
    // We need to use a different way in order to actually track this type of information
    // First we're going to need to:
    // - import useEffect from React.
    // - import { getRedirectResult } from 'firebase/auth';
    // - import { auth, ... } from '../../utils/firebase/firebase.utils';
    // auth will get the `getRedirectResult` result.
    // Now we transfered logGoogleRedirectUser() to useEffect
    // We are directly calling the signInWithGoogleRedirect() function from the "Log in with google redirect" button.
    // We are awaiting the result of the signInWithGoogleRedirect() function in the useEffect() hook.
    // We are getting the user data via. the getRedirectResult(auth) function (in useEffect).

    // I want to run a use effect, and I want to run this when this application mounts.
    useEffect(() => {
        async function fetchRedirectData() {        // this is an asynchronous method, getting the redirect result is asynchronous.
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
                console.table(userDocRef);
            }
        }
        fetchRedirectData();    // The function here being our callback inside, I want to call, get redirected result, get redirect result.
    }, []);
    // When you pass a empty array (dependency array), it means that to run this function once when this component mounts for the first time.


    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.table(userDocRef);
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    //     console.log({ user });   // undefined, we need to use getRedirectResult() to get the user data.
    // }


    return (
        <div>
            <h1>
                SignIn Page
            </h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>

            <SignUpForm />
        </div>
    )
}

export default SignIn;