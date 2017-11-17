import React from 'react'

import AddressForm from './template.js'

const AddressFormContainer = ({ address, handleChange, handleClick }) => (
  <AddressForm
    address={address}
    handleChange={(e) => handleChange(e.target.value)}
    handleClick={handleClick}
  />
);

export default AddressFormContainer
