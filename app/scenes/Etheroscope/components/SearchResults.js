import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

const Wrapper = styled.div`
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

export default class SearchResults extends React.Component {

  constructor (props) {
    super(props)
  }

  render() {
    const query = this.context.query
    this.matchingOrgs = this.props.route.popularOrgs.filter(org =>
      org.name.toLowerCase().indexOf(query) !== -1
    )
    this.matchingContracts = this.props.route.contracts.filter(contract =>
      contract.address.toLowerCase().indexOf(query) !== -1
      || contract.organisation.toLowerCase().indexOf(query) !== -1)
    if (this.matchingOrgs.length === 0 && this.matchingContracts.length === 0) {
      return (<CenteredP>No results found</CenteredP>)
    }

    // TODO: Move this to the organisation page
    // Add organisations to recent
    if (this.matchingOrgs.length > 0) {
      const recent = localStorage.recent && JSON.parse(localStorage.recent) || []
      for(var j=0; j < this.matchingOrgs.length; j++) {
        for(var i = 0; i < recent.length; i++) {
          if (recent[i].name === this.matchingOrgs[j].name) {
            recent.splice(i, 1)
            break
          }
        }
        recent.unshift(this.matchingOrgs[j])
      }
      localStorage.recent = JSON.stringify(recent)
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

SearchResults.contextTypes = {
  query: PropTypes.string
};

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
          {org.contracts.map((contract, contractKey) => (
            <li key={contractKey}>
              <a href={`/explorer#${contract.address}`}>{contract.address}</a>
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
