import React, { useState, useEffect } from 'react';
import axios from 'axios';

import socket from '../utils/socket';

import ListItem from './list-item.component';
import CustomButton from './custom-button.component';
import ListItemAdd from './list-item-add.component';
import ListItemEdit from './list-item-edit.component';
import ErrorDisplay from './error-display.component';

import './list-details.styles.scss';
import Progress from './progress.component';

const ListDetails = ({ match }) => {
  console.log('render')
  const [list, setList] = useState({ name: '', items: [] });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const fetchData = () => {
    socket.emit('initial_data', match.params.listId);
  }

  useEffect(() => {
    fetchData();
    socket.emit('join', match.params.listId);
    socket.on('data_changed', fetchData);
    socket.on('get_data', ({ list }) => {
      setUploadPercentage(0);
      setList(list);
    });

    socket.on('new error', ({ message }) => {
      setErrorMessage(message);
    })

    return () => {
      socket.emit('leave', match.params.listId);
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
      socket.emit('edit_item', { listId: match.params.listId, name: itemName, quantity, note, _id });

      setIsEditing(false);
      setItemToEdit(null);
    }
  }

  const handleDelete = _id => {
    socket.emit('delete_item', { listId: match.params.listId, _id });
  }

  const handleImageUpload = async (event) => {
    setErrorMessage(null);
    const { files } = event.target;
    if (files) {
      const formData = new FormData();
      for (let file of files) {
        formData.append('image', file);
      }

      try {
        await axios({
          method: 'post',
          url: `/api/lists/images/upload/${match.params.listId}`,
          data: formData,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 90) / progressEvent.total)
              )
            );
          }
        });

        setUploadPercentage(100);
      } catch (err) {
        setErrorMessage('Something went wrong. Please reload and try again');
      }
    }
  }

  const handleImageDelete = _id => {
    socket.emit('delete_image', { listId: match.params.listId, _id });
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
                      listId={match.params.listId}
                    />
                  })
                }
              </div>
          }
          <h1 className='list-details-title photos-header-title'>Photos</h1>
          <div className='list-details-photos-container'>
            <div className='list-details-upload-photo'>
              <input type='file' name='image' id='image' onChange={handleImageUpload} multiple />
              <label htmlFor='image'>
                <span className='image-upload-icon'>
                  <i className="fas fa-cloud-upload-alt"></i>
                </span>
                Add Photos
              </label>
              {
                uploadPercentage > 0 && <Progress percentage={uploadPercentage} />
              }
            </div>
            <div className='list-details-photos'>
              {
                list.images && list.images.map(image => {
                  return (
                    <div key={image._id} className='list-details-image-container'>
                      {
                        image.url &&
                        <>
                          <img src={image.url} alt='' className='list-image' onClick={() => window.open(image.url)} />
                          <div className='delete-image' onClick={() => handleImageDelete(image._id)}>
                            <span>&#10006;</span>
                          </div>
                        </>
                      }
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
  );
};

export default ListDetails;