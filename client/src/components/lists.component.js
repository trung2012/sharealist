import React, { useEffect, useContext, useState } from 'react';
import { Context as listContext } from '../context/ListContext';
import List from './list.component';
import ListAdd from './list-add.component';
import CustomButton from './custom-button.component';
import ErrorDisplay from './error-display.component';
import './lists.styles.scss';

const Lists = () => {
  const { state, getLists } = useContext(listContext);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getLists();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='lists-page'>
      <CustomButton buttonType='add-item' text='Add List' onClick={() => setIsAdding(true)} />
      {
        state.errorMessage && <ErrorDisplay text={state.errorMessage} />
      }
      <div className='lists-page-lists'>
        {
          state.lists.length > 0 &&
          state.lists.map(({ _id, name }) => {
            return <List key={_id} _id={_id} name={name} />
          })
        }
        {
          isAdding &&
          <ListAdd setIsAdding={setIsAdding} />
        }
      </div>
    </div>
  );
};


export default Lists;