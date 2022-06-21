import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';


// sign in with redirect requirements:
// import { useEffect } from 'react';
// import { auth, signInWithGoogleRedirect, createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
// import { getRedirectResult } from 'firebase/auth';


import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// password is sensitive info., so we need to use firebase auth.
// firebase auth will figure whether or not the password matches with the user (it's obfuscated from us)
const defaultFormFields = {     // common ground between logic of state management
    email: '',
    password: '',
};

const SignInForm = () => {

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
            // setCurrentUser(user);
            console.log(user.email);
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
                    alert(error);
            }
        }
    }

    // generic fn storing and setting the defaultFormFields
    const handleChange = (event) => {       // generic event handler
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });    // spread all the values, and modifying one value at a time([name]: value), in the place of name, event.target value is used
    }

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
        await signInWithGooglePopup();
        // setCurrentUser(user);
    }

    // const logGoogleRedirectUser = async () => {
    //     const { user } = await signInWithGoogleRedirect();
    //     const userDocRef = await createUserDocumentFromAuth(user);
    //     console.log({ user });   // undefined, we need to use getRedirectResult() to get the user data.
    // }

    /**/

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password.</span>
            <form onSubmit={handleSubmit} >
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={formFields.email} />
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={formFields.password} />

                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base} type='submit'>Sign In</Button>
                    <Button
                        type='button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                    {/* <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogleRedirect}></Button> */}
                    {/* </div> */}
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;