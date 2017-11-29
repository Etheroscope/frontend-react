import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding-top: 10px;
  width: 95%;
  margin: auto;
`
const Result = styled.div`
  background: lightgrey;
  border-radius 5px;
  padding: 16px;
  margin-bottom: 8px;
`
const CenteredP = styled.p`
  text-align: center;
`

const contracts = [
  {
    address: '0xa120Fd6CEc5733b544BC5276a815716F31951C35',
    description: 'Minting contract: this contract mints tokens representing the value of donations made in fiat',
    organisation: 'Alice'
  },
  {
    address: '0xBd897c8885b40d014Fb7941B3043B21adcC9ca1C',
    description: 'Donations: the main contract storing donations made to the London Street Impact: 15 Lives (LSI:15L) appeal',
    organisation: 'Alice'
  },
  {
    address: '0x2299B133551318fC3C34Bf81b46694651dA11282',
    description: 'Registry contract: this contract keeps track of donor balances and goals achieved',
    organisation: 'Alice'
  },
  {
    address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
    description: 'A contract belonging to the DAO.',
    organisation: 'The DAO'
  }
]

export default class SearchResults extends React.Component {

  constructor(props) {
    super(props)
    const query = window.location.search.slice(1).toLowerCase()
    console.log(query)
    this.matchingOrgs = this.props.route.organisations.filter(org => org.name.toLowerCase().indexOf(query) !== -1)
    this.matchingContracts = contracts.filter(contract =>
      contract.address.toLowerCase().indexOf(query) !== -1
      || contract.organisation.toLowerCase().indexOf(query) !== -1)
  }

  render() {
    if (this.matchingOrgs.length === 0 && this.matchingContracts.length === 0) {
      return (<CenteredP>No results found</CenteredP>)
    }
    return (
      <Wrapper>
        <Page>
          {this.matchingOrgs.length > 0 && (
            <div>
              <h1>Organisations</h1>
              {this.matchingOrgs.map(renderOrganisation)}
            </div>
          )}
          {this.matchingContracts.length > 0 && (
            <div>
              <h1>Contracts</h1>
              {this.matchingContracts.map(renderContract)}
            </div>
          )}
        </Page>
      </Wrapper>
    )
  }
}

function renderOrganisation(org) {
  return (
    <Result>
      <p>Organisation: {org.name} </p>
      {org.url && <p>Website: <a href={org.url}>{org.url}</a></p>}
      {org.description && <p>Description: {org.description}</p>}
      {org.contracts && org.contracts.length > 0 &&
      <div>
        <p>Contracts:</p>
        <ul>
          {org.contracts.map((contractAddress, contractKey) => (
            <li key={contractKey}>
              <p>{contractAddress}</p>
            </li>
          ))}
        </ul>
      </div>
      }
    </Result>
  )

}

function renderContract(contract) {
  return (
    <Result>
      {contract.name && <p>Result: {contract.name}</p>}
      <p>Address: <a href={`/explorer#${contract.address}`}>{contract.address}</a> </p>
      {contract.description && <p>Description: {contract.description}</p>}
    </Result>
  )
}