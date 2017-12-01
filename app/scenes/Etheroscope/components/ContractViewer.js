/* eslint-disable react/prop-types,no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
// Don't remove ReactDOM; needed for highstocks
import VariableSelection from './VariableSelection'
import styled from 'styled-components'
import { equals, prop } from 'ramda'
import fetchJson from './../xhr'
import fetchEtherscan from './../etherscan'

const ReactHighstock = require('react-highcharts/ReactHighstock')

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 400px;
  padding-top: 20px;
`
const Graph = styled(ReactHighstock)`
  display: flex;
`
const Variables = styled(VariableSelection)`
  display: flex;
  justify-content: stretch;
`
const CenteredH = styled.h1`
  text-align: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`

class ContractViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variableNames: [],
      currentVar: null,
      variableData: []
    }
    this.variableClicked = this.variableClicked.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (prop('address', nextProps.contract) && !equals(this.props.contract, nextProps.contract)) {
      const url = `/api?module=account&action=balance&address=${nextProps.contract.address}&tag=latest&apikey=AJAF8TPSIH2TBUGQJTI2VU98NV3A3YFNCI`
      fetchEtherscan(url).then(response => this.setState({ balance: response.status == 1 ? `${response.result / 1000000000000000000} ETH` : `0 WEI` }))
    }
  }

  fetchVariableHistory(varName) {
    const url = `/contracts/${this.props.contract.address}/history/${varName}`
    return fetchJson(url).then(response => response.data)
  }

  variableClicked(varName) {
    // Remove the variable from the set of displayed variables if it's displayed
    if (this.state.variableNames.includes(varName)) {
      const clickedIndex = this.state.variableNames.indexOf(varName)
      this.setState({
        variableNames: [...this.state.variableNames.slice(0, clickedIndex), ...this.state.variableNames.slice(clickedIndex + 1, this.state.variableNames.length)],
        currentVar: this.state.variableNames[this.state.variableNames.length - 1],
        variableData: [...this.state.variableData.slice(0, clickedIndex), ...this.state.variableData.slice(clickedIndex + 1, this.state.variableData.length)]
      })
      return
    }

    this.fetchVariableHistory(varName)
      .then(history => {
        const processedHistory = history.map(item => {
          item.value = parseFloat(item.value)
          return [item.time * 1000, item.value]
        })

        this.setState({
          variableNames: [...this.state.variableNames, varName],
          currentVar: varName,
          variableData: [...this.state.variableData, processedHistory.sort()]
        })
      })
  }

  render () {
    const variables = this.props.contract.variables
    const abi = this.props.contract.abi
    const nullContract = this.props.contract.nullContract

    if ((!abi || abi.length === 0) && !nullContract) {
      return (
        this.state.balance ?
          <CenteredH>
            Balance: {this.state.balance}
          </CenteredH>
        : <CenteredH>No ABI found for this contract</CenteredH>
      )
    }

    if ((!variables || variables.length === 0) && !nullContract) {
      return (
        this.state.balance ?
          <CenteredH>
            Balance: {this.state.balance}
          </CenteredH>
          : <CenteredH>No variables found for this contract</CenteredH>
      )
    }

    const seriesOptions = this.state.variableNames.map((name, i) =>
      ({name, data: this.state.variableData[i],
        tooltip: {
          valueDecimals: 2,
          split: true
        }}));

    const graph =
      (<ReactHighstock
        config={{
          rangeSelector: { selected: 1 },
          title: { text: 'Smart Contract Explorer' },

          tooltip: {
            shared: true,
            valueDecimals: 2,
            split: true
          },

          series: seriesOptions,
          credits: { enabled: false }
        }}
      />)

      return (
        <Wrapper>
          {this.state.balance &&
            <CenteredH>
              Balance: {this.state.balance}
            </CenteredH>
          }
          <Container>
            {variables.length > 0 ?
              <Row>
                {graph}

                <Variables
                  variables={variables}
                  selectedVariables={this.state.variableNames}
                  variableClicked={this.variableClicked}
                />
              </Row>
          : <CenteredH>Welcome to the explorer. Choose a contract and we will display the state of its variables here.</CenteredH>
          }
          </Container>
        </Wrapper>
      )

  }
}

export default ContractViewer