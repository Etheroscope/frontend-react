import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

const Wrapper = styled.div`
  background-color: white;
`

const EtheroscopeLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <Wrapper>
        <Header />
        <Component {...matchProps} />
        <Footer />
      </Wrapper>
    )} />
  )
}

export default EtheroscopeLayout
