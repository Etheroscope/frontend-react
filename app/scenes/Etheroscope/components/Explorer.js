import React from 'react'
import styled from 'styled-components'

import { fetchJson } from "../xhr"
import fetchEtherscan from '../etherscan'

import ContractGraph from './ContractGraph.js'
import Favourites from './Favourites.js'
import {contracts} from '../organisationContractData'
import { ExplorerErrors, ErrorTypes } from './ExplorerErrors'

const Heading = styled.h1`
  text-align: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BannerContainer = styled.div`
  width: 100%;
  background-color: #3398c0;
  padding-top: 10px;
  fontSize: 20px;
  color: #f9f9f9;
  width: 100%;
  margin: -14px auto 0 auto;
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

const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const DA_WEI_PER_ETH = 1000000000000000000

export default class Explorer extends React.Component {
  constructor(props) {
    super(props)
    const address = props.params.address;

    this.state = {
      address,
      contract: null,
      error: null,
      balance: 'Loading...',
      orgName: Explorer.findOrganisationName(address)
    }
  }

  render() {
    const org = this.state.orgName && this.state.orgName.length > 0
      ? ` (${this.state.orgName})` : ''
    const balance = this.state.balance ? ` - Balance: ${this.state.balance}` : ''
    const contract = this.state.contract
    const error = this.state.error
    return (
      <Wrapper>
        <BannerContainer>
          <Banner>
            <Favourites />
          </Banner>
        </BannerContainer>
        <Page>
          <ViewerWrapper>
            <Heading>{this.state.address + org + balance}</Heading>
            {error && <ExplorerErrors error={error} address={this.state.address} />}
            {(!contract && !error) && (
            <div className="loading-container">
              <div className="lds-rolling"><div /></div>
              <p>Loading...</p>
            </div>
            )}
            {contract && <ContractGraph contract={contract} address={this.state.address} />}
          </ViewerWrapper>
        </Page>
      </Wrapper>
    )
  }

  componentDidMount() {
    const backendContractURL = `/contracts/${this.state.address}`
    const balanceURL = `/api?module=account&action=balance&address=${this.state.address}&tag=latest&apikey=AJAF8TPSIH2TBUGQJTI2VU98NV3A3YFNCI`

    fetchEtherscan(balanceURL)
      .then(response => this.setState({
        balance: response.status === '1'
          ? `${response.result / DA_WEI_PER_ETH} ETH`
          : `Error loading balance`
      }))

    fetchJson(backendContractURL)
      .then(response => response.response)
      .then(contract => {
        if (!contract) {
          return this.setState({ error: ErrorTypes.NO_CONTRACT })
        }
        if (!contract.abi || contract.abi.length === 0) {
          return this.setState({ error: ErrorTypes.NO_ABI })
        }
        if (!contract.variables || contract.variables.length === 0) {
          return this.setState({ error: ErrorTypes.NO_VARIABLES })
        }
        return this.setState({ contract })
      })
      .catch(err => {
        this.setState({
          error: {
            heading: 'Error whilst retrieving contract',
            message: err.message
          }
        })
      });
  }

  static findOrganisationName(addr) {
    const entries = Object.values(contracts)
    for (let i = 0; i < entries.length; i++) {
      if(entries[i].address === addr) {
        return(entries[i].organisation)
      }
    }
    return null;
  }
}
