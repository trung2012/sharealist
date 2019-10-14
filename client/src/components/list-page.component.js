import React from 'react';
import { Route } from 'react-router-dom';
import Lists from './lists.component';
import ListDetails from './list-details.component';

const ListPage = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={Lists} />
      <Route path={`${match.path}/:listId`} component={ListDetails} />
    </>
  );
};

export default ListPage;