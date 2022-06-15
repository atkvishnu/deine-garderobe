import './sign-in-form.styles.scss';

import { useState, useEffect, useContext } from 'react';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth';

import { UserContext } from '../../contexts/user.context';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// password is sensitive info., so we need to use firebase auth.
// firebase auth will figure whether or not the password matches with the user (it's obfuscated from us)
const defaultFormFields = {     // common ground between logic of state management
    email: '',
    password: '',
};

const SignInForm = () => {

    const { setCurrentUser } = useContext(UserContext);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;   // destructuring defaultFormFields

    // console.log(formFields);


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();     // prevent default behavior of the form

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            setCurrentUser(user);
            console.log(user);
            resetFormFields();  // clear the form fields
        } catch (error) {

            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found!');
                    break;
                case 'auth/wrong-password':
                    alert('Wrong password!');
                    break;
                default:
                    console.log(error);
            }

        }
    }



    // generic fn storing and setting the defaultFormFields
    const handleChange = (event) => {       // generic event handler
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });    // spread all the values, and modifying one value at a time([name]: value), in the place of name, event.target value is used
    }


    /**/
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
    /*
    useEffect(() => {
        async function fetchRedirectData() {        // this is an asynchronous method, getting the redirect result is asynchronous.
            const response = await getRedirectResult(auth);
            // console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
                console.table(userDocRef);
            }
        }
        fetchRedirectData();    // The function here being our callback inside, I want to call, get redirected result, get redirect result.
    }, []);
    */
    // When you pass a empty array (dependency array), it means that to run this function once when this component mounts for the first time.


    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user);
        // console.table(userDocRef);
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    //     console.log({ user });   // undefined, we need to use getRedirectResult() to get the user data.
    // }

    /**/





    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password.</span>
            <form onSubmit={handleSubmit} >
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={formFields.email} />
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={formFields.password} />

                <div className='buttons-container'>
                    <Button buttonType='default' type='submit'>Sign In</Button>
                    {/* <div className='google-container'> */}
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                    {/* <Button buttonType='google' onClick={signInWithGoogleRedirect}></Button> */}
                    {/* </div> */}
                </div>
            </form>
        </div>
    );
};

export default SignInForm;