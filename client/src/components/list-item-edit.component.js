import React from 'react';
import ListItemChangeForm from './list-item-change-form.component';

import './list-item-edit.styles.scss';

const ListItemEdit = ({ handleSubmit, setIsEditing, currentItem }) => {
  return (
    <div className='list-item-edit'>
      <h1 className='list-item-edit-title'>Edit Item</h1>
      <ListItemChangeForm handleSubmit={handleSubmit} setIsChanging={setIsEditing} currentItem={currentItem} />
    </div>
  );
};

export default ListItemEdit;