import React from 'react';
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


export default class SearchResults extends React.Component {

    constructor(props) {
        super(props)
        this.displayResult = this.displayResult.bind(this)
    }

    displayResult = (result) => {
        switch (result.category) {
            case 'contract':
                return (
                  <li>
                    <p>Result: {result.name}</p>
                    <p>Address: {result.address} </p>
                    <p>Variables:</p>
                    <ul>
                      {result.variables.map((variable, key) => <li key={key}>{variable}</li>)}
                    </ul>
                  </li>
                )
            case 'address':
                return (
                  <div>
                    <p>Result: {result.address} </p>
                    <p>Variables:</p>
                    <ul>
                      {result.variables.map((variable, key) => <li key={key}>{variable}</li>)}
                    </ul>
                  </div>
                )
            case 'organisation':
                return (
                  <div>
                    <p>Organisation: {result.name} </p>
                    <p>Contracts:</p>
                    <ul>
                      {result.contracts.map((contract, contractKey) => (
                        <li key={contractKey}>
                          {contract.name && <p>Result: {contract.name}</p>}
                          <p>Address: {contract.address} </p>
                          <p>Variables:</p>
                          <ul>
                            {contract.variables.map((variable, varKey) => <li key={varKey}>{variable}</li>)}
                          </ul>
                        </li>
                            ))
                      }
                    </ul>
                  </div>
                )
            default: return(<p>No results found</p>)
        }
    }

    render() {
        const { searchResult } = this.props
        return (
          <Wrapper>
            <Page>
              {searchResult 
                    ? this.displayResult(searchResult)
                    : <p>No results found</p>
                    }
            </Page>
          </Wrapper>
        )
    }
}