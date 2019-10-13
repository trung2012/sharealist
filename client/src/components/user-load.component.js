import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import Spinner from './spinner.component';
import { withRouter } from 'react-router-dom';

const UserLoad = ({ history }) => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser(() => history.push(`/lists`));
    // eslint-disable-next-line
  }, [])

  return <Spinner />;
};

export default withRouter(UserLoad);