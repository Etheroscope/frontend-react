import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from "./components/Explorer"

// wrapper to pass props to HomePage
const HomePageWrapper = (props) => {
    return ( <HomePage {...props} />)
};

// wrapper to pass props to Explorer
const ExplorerWrapper = (props) => {
    return ( <Explorer {...props} /> )
};

const Etheroscope = () => (
  <Router history={browserHistory}>
    <Route path={"/"} component={HomePage} />
    <Route path={"explorer"} component={Explorer} />
  </Router>
);

export default Etheroscope
