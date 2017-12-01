import React from 'react'
import styled from 'styled-components'
import fetchJson from './../xhr'

import AddressFormContainer from './../AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'
import OrganisationCard from './OrganisationCard.js'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BannerContainer = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 10px;
  fontSize: 20px;
  color: #f9f9f9;
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
  width: 100%;
  margin: auto;
`
const CardContainer = styled.div`
  display: flex; 
  justify-content: center;
  & > {
    width: 100% !important;
  }
`
const CenterH = styled.h3`
  text-align: center;
`

export default class Explorer extends React.Component {
  constructor(props) {
    super(props)
    console.log(document.location.hash.slice(1)[0])
    const isAddress = document.location.hash.slice(1)[0] === '0'
    console.log(isAddress)
    const addressOrOrg = document.location.hash.slice(1)
    this.state = {
      contract: { isAddress, addressOrOrg, nullContract: true, variables: [], abi: [] },
      contractAddress: 'contract address'
    }
    if (isAddress) {
      this.changeContract(addressOrOrg)
    }
    this.changeContract = this.changeContract.bind(this)
    this.addressChanged = this.addressChanged.bind(this)
    this.exploreClicked = this.exploreClicked.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  downloadContract(address) {
    const url = `/contracts/${address}`
    return fetchJson(url)
  }

  changeContract(address) {
    return this.downloadContract(address)
        .then(contract => this.setState({
            contract,
            contractAddress: address
        }))
        .catch(err => {
            console.log(err);
            this.setState({
                contract: { address }
                // contractAddress: ""
            });
        })
  }

  exploreClicked() {
    this.changeContract(this.state.contractAddress)
  }

  addressChanged(newAddress) {
    this.setState({ contractAddress: newAddress })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.changeContract(this.state.contractAddress)
    }
  }

  render() {
    const addressOrOrg = document.location.hash.slice(1)

    return (
      <Wrapper>
        <BannerContainer>
          <Banner>
            <Favourites />
          </Banner>
        </BannerContainer>
        <Page>
          { addressOrOrg ?
            (addressOrOrg[0] === '0' 
              ? <ContractViewer contract={this.state.contract} />
              : <CardContainer>
                  <OrganisationCard fullwidth organisation={this.props.route.organisations.find(org => org.name === addressOrOrg)} />
                </CardContainer>)
            : <CenterH>Please look for a valid contract or organisation name</CenterH>
          }
        </Page>
      </Wrapper>
    )
  }
}
