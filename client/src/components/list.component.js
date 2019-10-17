import React, { useState, useContext } from 'react';
import { Context } from '../context/ListContext';
import { withRouter } from 'react-router-dom';
import Modal from './modal.component';
import ListEdit from './list-edit.component';

import './list.styles.scss';

const List = ({ _id, name, history }) => {
  const { deleteList, shareList } = useContext(Context);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareModalInput, setShareModalInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleListShare = () => {
    shareList({ emailAddress: shareModalInput, url: `${window.location.href}/${_id}` }, () => {
      alert('Share successful!');
    });
  };

  return (
    <>
      {
        showDeleteModal
        &&
        <Modal
          modalTitle='Delete List'
          modalConfirm={() => deleteList(_id)}
          modalDismiss={() => setShowDeleteModal(false)}
          confirmText='Delete'
        >
          <div className='modal-text'>
            Are you sure you want to delete this list? This cannot be undone
          </div>
        </Modal>
      }
      {
        showShareModal
        &&
        <Modal
          modalTitle='Share List'
          modalConfirm={handleListShare}
          modalDismiss={() => setShowShareModal(false)}
          confirmText='Share'
        >
          <div className='modal-text'>
            Please enter the emails you want to share this list with
          </div>
          <input
            className='share-modal-input'
            name='share'
            type='text'
            label='Emails'
            value={shareModalInput}
            onChange={e => setShareModalInput(e.target.value)}
            required
          />
        </Modal>
      }

      {
        isEditing ? <ListEdit setIsEditing={setIsEditing} _id={_id} name={name} />
          :
          <div className='list-display-item'>
            <div className='list-display-item__name' onClick={() => history.push(`/lists/${_id}`)}>
              <span className='list-icon'>
                <i className="far fa-list-alt"></i>
              </span>
              <div className='list-name'>
                {name}
              </div>
            </div>
            <div className='icons-container'>
              <span className='list-icon edit-list' title='Change Name' onClick={() => setIsEditing(true)}>
                <i className='fas fa-pen'></i>
              </span>
              <span className='list-icon delete-list' title='Delete' onClick={() => setShowDeleteModal(true)}>
                <i className="fas fa-trash-alt"></i>
              </span>
              <span className='list-icon share-list' title='Share' onClick={() => setShowShareModal(true)}>
                <i className="fas fa-share"></i>
              </span>
            </div>
          </div>

      }

    </>
  );
};

export default withRouter(List);