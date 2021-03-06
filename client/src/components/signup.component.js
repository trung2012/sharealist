import React, { useState, useContext } from 'react';
import { Context } from '../context/AuthContext';

import FormInput from './form-input.component';
import CustomButton from './custom-button.component';
import ErrorDisplay from './error-display.component';

import './signup.styles.scss';

const SignUp = ({ history }) => {
  const { state, signUp, clearErrorMessage } = useContext(Context);

  const [userCredentials, setUserCredentials] = useState({ displayName: '', email: '', password: '', confirmPassword: '' })
  const [errorMessage, setErrorMessage] = useState(null);
  const { email, password, confirmPassword, displayName } = userCredentials;

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return setErrorMessage('Passwords do not match. Please try again!');
    }
    if (password.length < 8) {
      return setErrorMessage('Passwords need to be at least 8 characters long');
    }

    signUp({ displayName, email, password }, () => {
      history.push('/');
    });
  }

  const onFocus = () => {
    clearErrorMessage();
    setErrorMessage(null);
  }

  return (
    <div className='sign-up-page'>
      <div className='content-container'>
        <h1 className='sign-up-title'>Sign up with email</h1>
        {
          errorMessage && <ErrorDisplay text={errorMessage} />
        }
        {
          state.errorMessage && <ErrorDisplay text={state.errorMessage} />
        }
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            name='displayName'
            type='text'
            value={displayName}
            required
            handleChange={handleChange}
            label='Display Name'
            onFocus={onFocus}
          />
          <FormInput
            name='email'
            type='email'
            value={email}
            required
            handleChange={handleChange}
            label='email'
            onFocus={onFocus}
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            required
            handleChange={handleChange}
            label='password'
            onFocus={onFocus}
          />
          <FormInput
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            required
            handleChange={handleChange}
            label='Confirm password'
            onFocus={onFocus}
          />
          <div className='buttons-container'>
            <CustomButton text='Sign Up' />
          </div>
          <div className='more-options'>
            <span>Already have an account?</span>
            <span
              className='register-link'
              onClick={() => {
                history.push('/signin');
                clearErrorMessage();
              }
              }
            >
              Sign In
              </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;