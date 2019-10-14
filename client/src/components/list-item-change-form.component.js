import React, { useState } from 'react';

import FormInput from './form-input.component';

import './list-item-change-form.styles.scss';
import CustomButton from './custom-button.component';

const ListItemChangeForm = ({ handleSubmit, setIsChanging, currentItem }) => {
  const initialItem = currentItem ? { ...currentItem, itemName: currentItem.name } : { itemName: '', quantity: '', note: '' }
  const [itemContent, setItemContent] = useState(initialItem);
  const { itemName, quantity, note } = itemContent;

  const handleChange = event => {
    const { value, name } = event.target;
    setItemContent({ ...itemContent, [name]: value });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    handleSubmit({ itemContent, _id: currentItem && currentItem._id });
  }

  return (
    <form className='list-item-change-form' onSubmit={onFormSubmit}>
      <FormInput
        type='text'
        name='itemName'
        label='Item Name'
        value={itemName}
        handleChange={handleChange}
        required
        autoFocus
      />
      <FormInput
        type='text'
        name='quantity'
        label='Item Quantity'
        value={quantity}
        handleChange={handleChange}
      />
      <FormInput
        type='text'
        name='note'
        label='Note'
        value={note}
        handleChange={handleChange}
      />
      <div className='list-item-change-button-container'>
        <CustomButton buttonType='save-item-change' type='submit' text='Save' onClick={onFormSubmit} />
        <CustomButton buttonType='cancel-item-change' type='button' text='Cancel' onClick={() => setIsChanging(false)} />
      </div>
    </form>
  );
};

export default ListItemChangeForm;