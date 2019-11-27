import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Context } from '../context/ListContext';

import './list-edit.styles.scss';

const ListEdit = ({ setIsEditing, _id, name }) => {
  const { editList } = useContext(Context);
  const [listName, setListName] = useState(name);

  const handleSubmit = event => {
    event.preventDefault();
    if (!listName) {
      alert('Please enter list name');
    } else {
      editList(_id, listName, () => {
        setIsEditing(false);
      });
    }
  }

  const handleEscape = event => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setListName(name);
    }
  }

  return (
    <div className='list-edit-display-item'>
      <div className='list-edit-display-item-content'>
        <span className='list-icon'>
          <i className="far fa-list-alt"></i>
        </span>
        <div className='list-edit-form-container'>
          <form onSubmit={handleSubmit} className='list-edit-form'>
            <input
              className='list-edit-input'
              type='text'
              value={listName}
              onChange={e => setListName(e.target.value)}
              onKeyDown={handleEscape}
              required
              autoFocus
            />
          </form>
          <div className='list-edit-icon-container'>
            <span className='list-icon edit-list' onClick={handleSubmit}>
              <i className="fas fa-check"></i>
            </span>
            <span className='list-icon close-adding' onClick={() => setIsEditing(false)}>
              <i className="fas fa-window-close"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListEdit);