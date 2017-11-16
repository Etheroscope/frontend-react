import React from 'react';
import styled from 'styled-components'
import fetchJson from './../xhr'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ContractGrid = styled.div`
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

    displayResult = (result) => {
        switch (result.category) {
            case 'contract':
                return (
                    <li>
                        <p>Result: {result.name}</p>
                        <p>Address: {result.address} </p>
                        <p>Variables:</p>
                        <ul>
                            {result.variables.map(variable => <li>{variable}</li>)}
                        </ul>
                    </li>
                )
            case 'address':
                return (
                    <div>
                        <p>Result: {result.address} </p>
                        <p>Variables:</p>
                        <ul>
                            {result.variables.map(variable => <li>{variable}</li>)}
                        </ul>
                    </div>
                )
            case 'organisation':
                return (
                    <div>
                        <p>Organisation: {result.name} </p>
                        <p>Contracts:</p>
                        <ul>
                            {
                                result.contracts.map(contract => {
                                    <li>
                                        {contract.name && <p>Result: {contract.name}</p>}
                                        <p>Address: {contract.address} </p>
                                        <p>Variables:</p>
                                        <ul>
                                            {contract.variables.map(variable => <li>{variable}</li>)}
                                        </ul>
                                    </li>
                                })
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
                    ? displayResult(searchResult)
                    : <p>No results found</p>
                    }
                </Page>
            </Wrapper>
        )
    }
}