import React from 'react'
import styled from 'styled-components'

import AddressFormContainer from './AddressForm'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: rgb(25, 152, 162);
  color: white;  
`

const PageText = styled.p`
  display: flex;
  align-self: center;
`

const Etheroscope = ({...props}) => {
  return (
    <Wrapper>
      <Banner>
        <AddressFormContainer />
      </Banner>
      <PageText>Some page text</PageText>
    </Wrapper>
  )
}

export default Etheroscope
