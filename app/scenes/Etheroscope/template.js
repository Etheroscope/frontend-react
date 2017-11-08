import React from 'react'
import styled from 'styled-components'
import {Router, Route, browserHistory} from "react-router"
import fetchJson from './xhr'

import Home from "./components/Home"
import Explorer from "./components/Explorer"


import AddressFormContainer from './AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'
import VariableSelection from './VariableSelection.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Banner = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 50px;
`

const Page = styled.div`
  width: 90%;
  margin: auto;
`

class Etheroscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contract: { variables: [] },
      contractAddress: 'contract address'
    };
    this.downloadContract = this.downloadContract.bind(this);
    this.favouriteClicked = this.favouriteClicked.bind(this);
    this.addressChanged = this.addressChanged.bind(this);
    this.exploreClicked = this.exploreClicked.bind(this);
  }

  downloadContract(address) {
    var url = '/contracts/' + address;
    return fetchJson(url);
  }

  favouriteClicked(address) {
    this.downloadContract(address)
        .then(this.setState({ contractAddress: address }));
  }

  exploreClicked(newAddress) {
    this.downloadContract(this.state.contractAddress);
  }

  addressChanged(newAddress) {
    this.setState({contractAddress: newAddress});
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"home"} component={Home}/>
        <Route path={"explorer"} component={Explorer}/>
      </Router>
    )
  }
}

export default Etheroscope
