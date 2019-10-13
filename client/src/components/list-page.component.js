import React from 'react';
import { Route } from 'react-router-dom';
import Lists from './lists.component';
import ListDetail from './list-details.component';

const ListPage = () => {
  return (
    <>
      <Route path='/' component={Lists} />
      <Route path='/lists/:listId' component={ListDetail} />
    </>
  );
};

export default ListPage;