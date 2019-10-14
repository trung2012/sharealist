import React from 'react';

import './list-item.styles.scss';

const ListItem = ({ item, handleDelete, setIsEditing, setItemToEdit, socket }) => {
  const { _id, name, quantity, note, completed } = item;
  const completedClass = completed ? 'list-item-name completed' : 'list-item-name';

  const onEditClick = () => {
    setItemToEdit(item);
    setIsEditing(true);
  }

  const onItemClick = () => {
    socket.emit('set_completed', _id);
  }

  return (
    <div className='list-item'>
      <div className='list-item-content' onClick={onItemClick}>
        <div className={`${completedClass}`}>
          <span className='list-item-content-name'>{name}</span>
          {
            quantity && <span className='list-item-quantity'>{`(${quantity})`}</span>
          }
        </div>
        {
          note && <div className='list-item-note'>{note}</div>
        }
      </div>
      <div className='list-item-icon-container'>
        <span className='list-icon edit-item' title='Edit' onClick={onEditClick}>
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