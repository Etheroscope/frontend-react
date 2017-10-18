import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Banner = styled.div`
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
      <Banner />
      <PageText>Some page text</PageText>
    </Wrapper>
  )
}

export default Etheroscope
