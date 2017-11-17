import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from './components/Explorer'

const Etheroscope = () => (
  <Router history={ browserHistory } >
    <Route path={ '/' } component={ HomePage } />
    <Route path={ 'explorer' } component={ Explorer } />
  </Router>
)

export default Etheroscope
