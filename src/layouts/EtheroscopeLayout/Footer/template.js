import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white
  display: flex;
  justify-content: center;
`

const AliceInfo = styled.p`
  display: flex;
  align-self: center;
`

const Footer = ({...props}) => (
  <Footer>
    <Wrapper>
      <AliceInfo>© 2017 ALICE SI Ltd.</AliceInfo>
    </Wrapper>
  </Footer>
)

export default Footer
