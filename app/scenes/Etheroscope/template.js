import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from './components/Explorer'
import SearchResults from './components/SearchResults'
import {contracts, popularOrgs} from './organisationContractData'

const Etheroscope = () => {
  return(
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} popularOrgs={popularOrgs} />
      <Route path="explorer" component={Explorer} />
      <Route path="searchresults" component={SearchResults} popularOrgs={popularOrgs} contracts={contracts}/>
    </Router>
  )
}

export default Etheroscope
