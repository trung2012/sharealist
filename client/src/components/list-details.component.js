import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketioClient from 'socket.io-client';
import ListItem from './list-item.component';
import CustomButton from './custom-button.component';

import './list-details.styles.scss';

const ListDetails = ({ match }) => {
  const socket = socketioClient('http://localhost:5000/', { transports: ['websocket'] });

  socket.on('hello', ({ message }) => {
    console.log('hello')
  })


  const [listItems, setListItems] = useState([]);
  const [listName, setListName] = useState('');
  const [isAdding, setIsAdding] = useState('false');

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: 'get',
        url: '/api/lists/items',
        params: {
          list: match.params.listId
        }
      });

      setListName(res.data.listName);
      setListItems(res.data.items);
    })();
  }, [match.params.listId])

  const handleDelete = _id => {
    setListItems(listItems.filter(item => item._id !== _id));
  }

  return (
    <div className='list-details'>
      <h1 className='list-details-title'>{listName}</h1>
      <CustomButton buttonType='add-item' text='Add Item' onClick={() => setIsAdding(true)} />
      {
        listItems.map(item => {
          return <ListItem key={item._id} handleDelete={handleDelete} item={item} />
        })
      }
    </div>
  );
};

export default ListDetails;