import React from 'react';
import CustomButton from './custom-button.component';

import './modal.styles.scss';

const Modal = ({ modalConfirm, modalDismiss, modalTitle, modalText }) => {
  return (
    <div className='modal'>
      <div className='overlay' onClick={modalDismiss}></div>
      <div className='modal-title'>
        <span className='modal-title-text'>{modalTitle}</span>
        <span className='modal-close' onClick={modalDismiss}>
          <i className="fas fa-times"></i>
        </span>
      </div>
      <div className='modal-content'>
        <div className='modal-text'>
          {modalText}
        </div>
        <div className='modal-buttons'>
          <CustomButton text='Yes' onClick={modalConfirm} />
          <CustomButton text='Cancel' onClick={modalDismiss} />
        </div>
      </div>
    </div>
  );
};

export default Modal;