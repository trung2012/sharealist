import React, { useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../context/AuthContext'
import Lists from './lists.component';
import ListDetails from './list-details.component';

const ListPage = ({ match, history }) => {
  const { state } = useContext(Context);

  useEffect(() => {
    if (!state.user) {
      history.push('/')
    }
  }, [history, state.user])

  return (
    <>
      <Route exact path={`${match.path}`} component={Lists} />
      <Route path={`${match.path}/:listId`} component={ListDetails} />
    </>
  );
};

export default ListPage;