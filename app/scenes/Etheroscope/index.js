import React from 'react'

import './style.scss'

import HeaderContainer from './Header'
import FooterContainer from './Footer'
import AddressFormContainer from './AddressForm'
import Favourites from './Favourites'
import ContractViewer from './ContractViewer.js'

export default class Etheroscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contract: {} };
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <main>
          <nav className="banner">
            <AddressFormContainer address={this.state.contract.address}/>
            <Favourites favourites={this.props.favourites}/>
          </nav>
          <ContractViewer/>
        </main>
        <FooterContainer />
      </div>
    );
  }
};