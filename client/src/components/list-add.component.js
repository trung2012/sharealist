import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../context/ListContext';

import './list-add.styles.scss';

const ListAdd = ({ setIsAdding, history }) => {
  const { addList } = useContext(Context);
  const [listName, setListName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (!listName) {
      alert('Please enter list name');
    } else {
      addList(listName, (_id) => history.push(`/lists/${_id}`));
      setIsAdding(false);
    }
  }

  const handleEscape = event => {
    if (event.key === 'Escape') {
      setIsAdding(false);
      setListName('');
    }
  }

  return (
    <div className='list-add-display-item'>
      <div className='list-add-display-item__name'>
        <span className='list-icon'>
          <i className="far fa-list-alt"></i>
        </span>
        <div className='list-add-form-container'>
          <form onSubmit={handleSubmit} className='list-add-form'>
            <input
              className='list-add-input'
              type='text'
              placeholder='Enter List Name'
              value={listName}
              onChange={e => setListName(e.target.value)}
              onKeyDown={handleEscape}
              required
              autoFocus
            />
          </form>
          <div className='list-add-icon-container'>
            <span className='list-icon add-new-list' onClick={handleSubmit}>
              <i className="fas fa-plus"></i>
            </span>
            <span className='list-icon close-adding' onClick={() => setIsAdding(false)}>
              <i className="fas fa-window-close"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListAdd);