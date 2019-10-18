import React from 'react';

const ImageModal = ({ url }) => {
  return (
    <div className='image-modal'>
      <div className='image-modal-overlay'></div>
      <img src={url} className='image-modal-image' />
    </div>
  );
};

export default ImageModal;