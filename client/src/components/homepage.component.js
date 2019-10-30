import React, { useContext, useEffect } from 'react';
import Spinner from '../components/spinner.component';
import SignIn from '../components/signin.component';
import { Context } from '../context/AuthContext';

const HomePage = ({ history }) => {
  const { state } = useContext(Context);

  useEffect(() => {
    if (state.user) {
      history.push('/lists');
    }
    // eslint-disable-next-line
  }, [state.user])

  return (
    state.token ? <Spinner />
      : <SignIn />
  );
}

export default HomePage;