import React, { useState, useContext } from 'react';
import { Context } from '../context/AuthContext';

import UserLoad from './user-load.component';
import FormInput from './form-input.component';
import CustomButton from './custom-button.component';
import ErrorDisplay from './error-display.component';

import './signin.styles.scss';

const SignIn = ({ history }) => {
  const { state, signIn, clearErrorMessage } = useContext(Context);

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })
  const { email, password } = userCredentials;

  const handleChange = event => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await signIn({ email, password });
      if (state.token) {
        history.push('/lists')
      }
    } catch (err) {

    }
  }

  return (
    state.token ?
      <UserLoad /> :
      <div className='sign-in-page'>
        <div className='content-container'>
          <h1 className='sign-in-title'>Sign in</h1>
          <ErrorDisplay text={state.errorMessage} />
          <form className='sign-in-form' onSubmit={handleSubmit}>
            <FormInput
              name='email'
              type='email'
              value={email}
              required
              handleChange={handleChange}
              label='email'
              onFocus={() => clearErrorMessage()}
            />
            <FormInput
              name='password'
              type='password'
              value={password}
              required
              handleChange={handleChange}
              label='password'
              onFocus={() => clearErrorMessage()}
            />
            <div className='buttons-container'>
              <CustomButton text='Sign in' />
            </div>
            <div className='more-options'>
              <span>Don't have an account?</span>
              <span className='register-link' onClick={() => history.push('/signup')}>Register Now</span>
            </div>
          </form>
        </div>
      </div>
  );
}

export default SignIn;