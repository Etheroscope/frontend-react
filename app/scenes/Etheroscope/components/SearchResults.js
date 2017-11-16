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
        const { category, name, address, description, contracts, variables, url } = result
        switch (category) {
            case 'contract':
                return (
                  <li>
                    {name && <p>Result: {name}</p>}
                    <p>Address: {address} </p>
                    {description && <p>Description: {description}</p>}
                    {variables && 
                    <div>
                      <p>Variables:</p>
                      <ul>
                        {variables.map((variable, key) => <li key={key}>{variable}</li>)}
                      </ul>
                    </div>
                    }
                  </li>
                )
            case 'organisation':
                return (
                  <div>
                    <p>Organisation: {name} </p>
                    {url && <p>Website: <a href={url}>{result.url}</a></p>}
                    {description && <p>Description: {description}</p>}
                    {contracts && 
                    <div>
                      <p>Contracts:</p>
                      <ul>
                        {contracts.map((contract, contractKey) => (
                          <li key={contractKey}>
                            <p>{contract}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    }
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