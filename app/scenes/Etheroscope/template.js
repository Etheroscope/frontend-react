import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white
  display: flex;
  justify-content: center;
`

const PageText = styled.p`
  display: flex;
  align-self: center;
`

const Etheroscope = ({...props}) => {
  return (
    <Wrapper>
      <PageText>Some page text</PageText>
    </Wrapper>
  )
}

export default Etheroscope
