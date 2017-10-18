import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
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
`;

const AddressForm = ({ handleChange, handleSubmit, address }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <AddressInput type="text" value={address} onChange={handleChange}/>
      <ExploreButton type="submit">Explore</ExploreButton>
    </Form>
  )
};

export default AddressForm