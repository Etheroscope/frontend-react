import React from 'react'
import {Router, Route, browserHistory} from "react-router"

import Explorer from "./components/Explorer"

const Etheroscope = () => (
  <Router history={browserHistory}>
    <Route path={"/"} component={Explorer} />
    <Route path={"explorer"} component={Explorer} />
  </Router>
);

export default Etheroscope
