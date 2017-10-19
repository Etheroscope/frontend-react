import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
`

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
`

const ExploreButton = styled.button`
  background-color: #1998a2;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  padding: 5px 50px;
  letter-spacing: 2px;
  line-height: 1.42;
`

const AddressForm = ({ handleSubmit, address }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field name='address' component={AddressInput} type="text" value={address}/>
      <ExploreButton type="submit">Explore</ExploreButton>
    </Form>
  )
}

export default reduxForm({ form: 'addressForm' })(AddressForm)