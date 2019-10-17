import React, { useState, useEffect } from 'react';
import socket from '../utils/socket';

import ListItem from './list-item.component';
import CustomButton from './custom-button.component';
import ListItemAdd from './list-item-add.component';
import ListItemEdit from './list-item-edit.component';
import ErrorDisplay from './error-display.component';

import './list-details.styles.scss';

const ListDetails = ({ match }) => {
  const [list, setList] = useState({ name: '', items: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = () => {
    socket.emit('initial_data', match.params.listId);
  }

  useEffect(() => {
    fetchData();
    socket.on('data_changed', fetchData);
    socket.on('get_data', ({ list }) => {
      setList(list);
    })
    socket.on('new error', ({ message }) => {
      setErrorMessage(message);
    })

    return () => {
      socket.off('data_changed');
      socket.off('get_data');
      socket.off('new error');
    }
    // eslint-disable-next-line 
  }, [])

  const handleAdd = ({ itemContent }) => {
    if (itemContent.itemName) {
      const { itemName, quantity, note } = itemContent;
      socket.emit('add_item', { listId: list._id, item: { name: itemName, quantity, note } });

      setIsAdding(false);
    }
  }

  const handleEdit = ({ itemContent, _id }) => {
    if (itemContent.itemName && _id) {
      const { itemName, quantity, note } = itemContent;
      socket.emit('edit_item', { name: itemName, quantity, note, _id });

      setIsEditing(false);
      setItemToEdit(null);
    }
  }

  const handleDelete = _id => {
    socket.emit('delete_item', _id);
  }

  return (
    isAdding ? <ListItemAdd handleSubmit={handleAdd} setIsAdding={setIsAdding} /> :
      isEditing ? <ListItemEdit handleSubmit={handleEdit} setIsEditing={setIsEditing} currentItem={itemToEdit} /> :
        <div className='list-details'>
          <h1 className='list-details-title'>{list.name}</h1>
          {
            errorMessage && <ErrorDisplay text={errorMessage} />
          }
          <CustomButton buttonType='add-item' text='Add Item' onClick={() => setIsAdding(true)} />
          {
            list.items.length === 0 ? <h1 className='blank-list-text'>No Items</h1>
              : <div className='list-details-item-container'>
                {
                  list.items.map(item => {
                    return <ListItem
                      key={item._id}
                      handleDelete={handleDelete}
                      item={item}
                      setIsEditing={setIsEditing}
                      setItemToEdit={setItemToEdit}
                      socket={socket}
                    />
                  })
                }
              </div>
          }
        </div>
  );
};

export default ListDetails;