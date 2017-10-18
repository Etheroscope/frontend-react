import React from 'react'
import styled from 'styled-components'

import EtheroscopeLayout from 'layouts/EtheroscopeLayout'
import EtheroscopeContainer from './Etheroscope'


const RootStyle = styled.div`
  font-family: 'Montserrat', sans-serif;
  height: 100%;
`

class App extends React.Component {
  render () {
    return (
      <RootStyle>
        <EtheroscopeLayout exact path='/' component={EtheroscopeContainer} />
      </RootStyle>
    )
  }
}
