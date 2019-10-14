import React from 'react';
import ListItemChangeForm from './list-item-change-form.component';

import './list-item-add.styles.scss';

const ListItemAdd = ({ handleSubmit, setIsAdding }) => {
  return (
    <div className='list-item-add'>
      <h1 className='list-item-add-title'>Add Item</h1>
      <ListItemChangeForm handleSubmit={handleSubmit} setIsChanging={setIsAdding} />
    </div>
  );
};

export default ListItemAdd;