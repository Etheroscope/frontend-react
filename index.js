import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import EtheroscopeContainer from './app/scenes/Etheroscope'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={EtheroscopeContainer} />
  </Router>,
  document.getElementById('app')
);
