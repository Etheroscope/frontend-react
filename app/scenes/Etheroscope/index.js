import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Etheroscope from './template.js'
import HeaderContainer from './Header'
import FooterContainer from './Footer'

const Wrapper = styled.div`
  background-color: white;
`

const EtheroscopeContainer = ({...props}) => {
  return (
    <Wrapper>
      <HeaderContainer />
        <Etheroscope {...props} />
      <FooterContainer />
    </Wrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    address: state.address
  }
}

export default connect(mapStateToProps)(EtheroscopeContainer)