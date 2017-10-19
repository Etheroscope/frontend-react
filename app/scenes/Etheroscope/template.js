import React from 'react'
import styled from 'styled-components'

import AddressFormContainer from './AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Banner = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 50px;
  font=size: 20px;
  color: white;
`

const SelectionWrapper = styled.div`
  width: '90%';
  margin: '0 auto';
  display: 'flex';
  flexDirection: 'column';
`

const Etheroscope = ({...props}) => {
  const { address, favourites } = props
  return (
    <Wrapper>
      <Banner>
        <SelectionWrapper>
          <AddressFormContainer address={address}/>
          <Favourites favourites={favourites}/>
        </SelectionWrapper>
      </Banner>
      <ContractViewer/>
    </Wrapper>
  )
}

export default Etheroscope
