import React from 'react'
import styled from 'styled-components'

import Etheroscope from './template.js'
import HeaderContainer from './Header'
import FooterContainer from './Footer'

const Wrapper = styled.div`
`

const BodyWrapper = styled.div`
  padding: 132px 0 20px 0;
  background-color: #efefef;
`

const EtheroscopeContainer = ({...props}) => {
  return (
    <Wrapper>
      <HeaderContainer />
      <BodyWrapper>
        <Etheroscope {...props} />
      </BodyWrapper>
      <FooterContainer />
    </Wrapper>
  )
}

export default EtheroscopeContainer
