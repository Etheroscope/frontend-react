import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from './components/Explorer'
import SearchResults from './components/SearchResults'
import { popular } from './Organisations'

// wrapper to pass props to HomePage
const HomePageWrapper = (props) => {
    return ( <HomePage {...props} />)
}

// wrapper to pass props to Explorer
const ExplorerWrapper = (props) => {
    return ( <Explorer {...props} /> )
}

const Etheroscope = () => {
  

  return(
    <Router history={browserHistory}>
      <Route
        path={"/"} component={HomePage}
        organisations={popular}
      />
      <Route 
        path={"explorer"} component={Explorer} 
        organisations={popular} 
      />
      <Route
        path={"searchresults"} component={SearchResults}
        organisations={popular}
      />
    </Router>
  )
}

export default Etheroscope
