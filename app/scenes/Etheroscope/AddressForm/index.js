import React from 'react'

import AddressForm from './template.js'

const AddressFormContainer = ({ address, handleChange, handleClick, handleKeyPress }) => (
  <AddressForm
    address={address}
    handleChange={(e) => handleChange(e.target.value)}
    handleClick={handleClick}
    handleKeyPress={handleKeyPress}
  />
);

export default AddressFormContainer
