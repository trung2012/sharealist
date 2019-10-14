import React, { useState } from 'react';

import './list-item.styles.scss';

const ListItem = ({ item, handleDelete }) => {
  const { _id, name, quantity, note, completed } = item;
  const [isEditing, setIsEditing] = useState(false);

  const completedClass = completed ? 'list-item-name completed' : 'list-item-name';

  return (
    <div className='list-item'>
      <div className='list-item-content'>
        <div className={`${completedClass}`}>
          {name}
          {
            quantity && <span className='list-item-quantity'>{`(${quantity})`}</span>
          }
        </div>
        {
          note && <div className='list-item-note'>{note}</div>
        }
      </div>
      <div className='list-item-icon-container'>
        <span className='list-icon edit-item' title='Change Name' onClick={() => setIsEditing(true)}>
          <i className='fas fa-pen'></i>
        </span>
        <span className='list-icon delete-item' title='Delete' onClick={() => handleDelete(_id)}>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default ListItem;