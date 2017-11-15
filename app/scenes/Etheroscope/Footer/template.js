import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const AliceInfo = styled.p`
  display: flex;
  align-self: center;
`

const Footer = () => {
  return (
    <Wrapper>
      <AliceInfo>© 2017 Etheroscope.</AliceInfo>
    </Wrapper>
  )
}

export default Footer
