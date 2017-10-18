import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  justify-content: center;
`

const AddressForm = ({...props}) => {
  const { handleChange, handleSubmit, value } = props
  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Address:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Explore" />
    </Form>
  )
}

export default AddressForm