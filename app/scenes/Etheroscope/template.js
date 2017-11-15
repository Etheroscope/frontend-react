import React from 'react'
import {Router, Route, browserHistory} from 'react-router'

import HomePage from './components/HomePage'
import Explorer from './components/Explorer'

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
        .then(contract => this.setState({ contract, contractAddress: address }));
  }

  exploreClicked(newAddress) {
    this.downloadContract(this.state.contractAddress);
  }

  addressChanged(newAddress) {
    this.setState({contractAddress: newAddress});
  }

  render() {
    return (
      <Wrapper>
        <Banner style={{ fontSize: '20px', color: 'white' }}>
          <div style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <AddressFormContainer address={this.state.contractAddress} handleChange={this.addressChanged} handleClick={this.exploreClicked}/>
            <Favourites favourites={this.props.favourites} handleClick={this.favouriteClicked}/>
          </div>
        </Banner>
	    <Page>
          <ContractViewer contract={this.state.contract}/>
        </Page>
      </Wrapper>
    )
  }
}

export default Etheroscope
