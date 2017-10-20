import React from 'react'
import styled from 'styled-components'

const Form = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
`;

const AddressInput = styled.input`
  background-color: transparent;
  flex: 1 500px;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  outline: none;
  box-shadow: none;
  max-width: 500px;
  margin: 0 32px;
  padding: 0 12px;
`;

const ExploreButton = styled.button`
  background-color: #1998a2;
  border: 1px solid white;
  color: white;
  padding: 5px 50px;
  letter-spacing: 2px;
  line-height: 1.42;
  cursor: pointer;
`;

const AddressForm = ({ handleChange, handleClick, address }) => {
  return (
    <Form>
      <AddressInput type="text" value={address} onChange={handleChange}/>
      <ExploreButton onClick={handleClick}>Explore</ExploreButton>
    </Form>
  )
};

export default AddressForm