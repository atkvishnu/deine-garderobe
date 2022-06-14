import './sign-up-form.styles.scss';

import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// password is sensitive info., so we need to use firebase auth.
// firebase auth will figure whether or not the password matches with the user (it's obfuscated from us)
const defaultFormFields = {     // common ground between logic of state management
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;   // destructuring defaultFormFields

    console.log(formFields);


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();     // prevent default behavior of the form

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();  // clear the form fields
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use.');
            }
            alert('Error: User creation encountered an error! ', error);
        }
    }



    // generic fn storing and setting the defaultFormFields
    const handleChange = (event) => {       // generic event handler
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });    // spread all the values, and modifying one value at a time([name]: value), in the place of name, event.target value is used
    }


    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password.</span>
            <form onSubmit={handleSubmit} >
                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={formFields.displayName} />
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={formFields.email} />
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={formFields.password} />
                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={formFields.confirmPassword} />

                <Button buttonType='default' type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;