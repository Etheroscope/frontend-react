import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from './components/Explorer'
import SearchResults from './components/SearchResults'
import {contracts, popularOrgs} from './organisationContractData'
import Organisation from './components/Organisation'

const Etheroscope = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} popularOrgs={popularOrgs} />
      <Route path="/organisations" component={HomePage} popularOrgs={popularOrgs} />
      <Route path="/organisations/:name" component={Organisation} organisations={popularOrgs} />
      <Route path="/contracts/:address" component={Explorer} />
      <Route path="/search" component={SearchResults} popularOrgs={popularOrgs} contracts={contracts}/>
    </Router>
  )
}

export default Etheroscope
