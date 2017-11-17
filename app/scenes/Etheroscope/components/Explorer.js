import React from 'react'
import styled from 'styled-components'
import fetchJson from './../xhr'

import AddressFormContainer from './../AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BannerContainer = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 10px;
  fontSize: 20px;
  color: white;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Banner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  width: 90%;
  margin: auto;
`

export default class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contract: { variables: [] },
      contractAddress: 'contract address'
    }
    this.changeContract = this.changeContract.bind(this)
    this.addressChanged = this.addressChanged.bind(this)
    this.exploreClicked = this.exploreClicked.bind(this)
  }

  static downloadContract(address) {
    const url = `/contracts/${address}`
    return fetchJson(url)
  }

  changeContract(address) {
    return Explorer.downloadContract(address)
      .then(contract => this.setState({
        contract,
        contractAddress: address
      }))
  }

  exploreClicked() {
    this.changeContract(this.state.address)
  }

  addressChanged(newAddress) {
    this.setState({ contractAddress: newAddress })
  }

  render() {
    return (
      <Wrapper>
        <BannerContainer>
          <Banner>
            <AddressFormContainer
              address={this.state.contractAddress}
              handleChange={this.addressChanged}
              handleClick={this.exploreClicked}
            />
            <Favourites handleClick={this.changeContract}/>
          </Banner>
        </BannerContainer>
        <Page>
          <ContractViewer contract={this.state.contract}/>
        </Page>
      </Wrapper>
    )
  }
}
