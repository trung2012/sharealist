import React, { useContext, useEffect } from 'react';
import Spinner from '../components/spinner.component';
import SignIn from '../components/signin.component';
import { Context } from '../context/AuthContext';

const HomePage = ({ history }) => {
  const { state, loadUser } = useContext(Context);

  useEffect(() => {
    loadUser(() => history.push('/lists'));
    // eslint-disable-next-line
  }, [])

  return (
    state.user ? <Spinner />
      : <SignIn />
  );
}

export default HomePage;