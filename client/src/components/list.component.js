import React from 'react';

import './list.styles.scss';

const List = ({ name }) => {
  return (
    <div className='list-display-item'>
      <div className='list-display-item__name'>
        <span className='list-icon'>
          <i className="far fa-list-alt"></i>
        </span>
        <span className='list-name'>
          {name}
        </span>
      </div>
      <div>
        <span className='list-icon'>
          <i className='fas fa-pen'></i>
        </span>
        <span className='list-icon'>
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
    </div>
  );
};

export default List;