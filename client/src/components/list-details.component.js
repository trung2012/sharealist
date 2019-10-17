import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    try {
      await axios.post('/api/lists/images/upload', { listId: match.params.listId, file: files[0] });
    } catch (err) {
      setErrorMessage(err.response.data);
    }
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
          <h1 className='list-details-title photos-header-title'>Photos</h1>
          <div className='list-details-photos'>
            <div className='list-details-upload-photo'>
              <input type='file' name='image' id='image' onChange={handleImageUpload} />
              <label htmlFor='image'>
                <span className='image-upload-icon'>
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
                Add Photos
              </label>
            </div>
          </div>
        </div >
  );
};

export default ListDetails;