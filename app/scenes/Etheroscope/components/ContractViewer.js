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

class ContractViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variableNames: [],
      currentVar: null,
      variableData: [] }
    this.variableClicked = this.variableClicked.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (prop('address', nextProps.contract) && !equals(this.props.contract, nextProps.contract)) {
      const url = `/api?module=account&action=balance&address=${this.props.contract.address}&tag=latest&apikey=AJAF8TPSIH2TBUGQJTI2VU98NV3A3YFNCI`
      fetchEtherscan(url).then(response => this.setState({ balance: response.status == 1 ? `${response.result} WEI` : `0 WEI` }))
    }
  }

  fetchVariableHistory(varName) {
    const url = `/contracts/${this.props.contract.address}/history?variable=${varName}`
    return fetchJson(url)
  }

  // only fetch history if variable not already in variableNames
  variableClicked(varName) {
    if (!(this.state.variableNames.includes(varName))) {
      console.log("new variable")
      this.fetchVariableHistory(varName)
        .then(history => {
          const processedHistory = history.map(item => {
            item.value = parseFloat(item.value);
            return [item.time * 1000, item.value]
          });

          this.setState({
            variableNames: [...this.state.variableNames, varName],
            currentVar: varName,
            variableData: [...this.state.variableData, processedHistory.sort()]
          });
        })
    } else {
      // remove from graph
      console.log("already present")
      this.fetchVariableHistory(varName)
        .then(history => {
          const processedHistory = history.map(item => {
            item.value = parseFloat(item.value);
            return [item.time * 1000, item.value]
          });

          const clickedIndex = this.state.variableNames.indexOf(varName)
          this.setState({
            variableNames: [...this.state.variableNames.slice(0, clickedIndex), ...this.state.variableNames.slice(clickedIndex + 1, this.state.variableNames.length)],
            currentVar: this.state.variableNames[this.state.variableNames.length - 1],
            variableData: [...this.state.variableData.slice(0, clickedIndex), ...this.state.variableData.slice(clickedIndex + 1, this.state.variableData.length)]
          });
        })
    }
  }

  render () {
    const variables = this.props.contract.variables // ['test', 'test', 'test', 'tegrebuizhfjopzihgrubhofzjpst', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test']
    const abi = this.props.contract.abi
    const nullContract = this.props.contract.nullContract

    if ((!abi || abi.length === 0) && !nullContract) {
      return <CenteredH> No ABI for this variable </CenteredH>
    }

    if ((!variables || variables.length === 0) && !nullContract) {
      return <CenteredH> No variables in this contract </CenteredH>
    }

      return (
        <Wrapper>
          {this.state.balance &&
            <p>
              Balance: {this.state.balance}
            </p>
          }
          <Container>
            {this.state.variableData.length > 0 ?
              <div>
                <ReactHighstock
                  config={{
                rangeSelector: { selected: 1 },
                title: { text: 'Smart Contract Explorer' },
                series: [{
                  name: 'Explorer',
                  data: this.state.variableData,
                  tooltip: { valueDecimals: 2 }
                }],
                credits: { enabled: false }
              }}
                />
                <Variables
                  variables={variables}
                  selectedVariables={this.state.variableNames}
                  variableClicked={this.variableClicked}
                />
              </div>
          : <CenteredH>Welcome to the explorer. Choose a contract and we will display the state of its variables here.</CenteredH>
          }
          </Container>
        </Wrapper>
      )

  }
}

export default ContractViewer