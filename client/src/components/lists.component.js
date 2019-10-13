import React, { useEffect, useContext } from 'react';
import List from './list.component';
import { Context as ListContext } from '../context/ListContext';

import './lists.styles.scss';

const Lists = () => {
  const { state, getLists } = useContext(ListContext);

  useEffect(() => {
    getLists();
  }, [getLists])

  return (
    <div className='lists-page'>
      {
        state.lists.length > 0 &&
        state.lists.map(list => {
          return <List key={list._id} name={list.name} />
        })
      }
    </div>
  );
};


export default Lists;