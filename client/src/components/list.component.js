import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modal.component';

import './list.styles.scss';
import { Context } from '../context/ListContext';
import ListEdit from './list-edit.component';

const List = ({ _id, name }) => {
  const { deleteList } = useContext(Context)
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {
        showModal
        &&
        <Modal
          modalTitle='Delete List'
          modalText='Are you sure you want to delete this list? This cannot be undone'
          modalConfirm={() => deleteList(_id)}
          modalDismiss={() => setShowModal(false)}
        />
      }

      {
        isEditing ? <ListEdit setIsEditing={setIsEditing} _id={_id} name={name} />
          :
          <div className='list-display-item'>
            <div className='list-display-item__name'>
              <span className='list-icon'>
                <i className="far fa-list-alt"></i>
              </span>
              <Link to={`/lists/${_id}`} className='list-name'>
                {name}
              </Link>
            </div>
            <div>
              <span className='list-icon edit-list' title='Change Name' onClick={() => setIsEditing(true)}>
                <i className='fas fa-pen'></i>
              </span>
              <span className='list-icon delete-list' title='Delete' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash-alt"></i>
              </span>
              <span className='list-icon share-list' title='Share'>
                <i className="fas fa-share"></i>
              </span>
            </div>
          </div>

      }

    </>
  );
};

export default List;