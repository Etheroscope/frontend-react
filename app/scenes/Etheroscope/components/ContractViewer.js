/* eslint-disable react/prop-types,no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
// Don't remove ReactDOM; needed for highstocks
import VariableSelection from './VariableSelection'
import styled from 'styled-components'
import fetchJson from './../xhr'

const ReactHighstock = require('react-highcharts/ReactHighstock')

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

  fetchVariableHistory(varName) {
    const url = `/contracts/${this.props.contract.address}/history?variable=${varName}`
    return fetchJson(url)
  }

  // only fetch history if variable not already in variableNames
  variableClicked(varName) {
    if (!(this.state.variableNames.includes(varName))) {
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
      this.fetchVariableHistory(varName)
        .then(history => {
          const processedHistory = history.map(item => {
            item.value = parseFloat(item.value);
            return [item.time * 1000, item.value]
          });

          let clickedIndex = this.state.variableNames.indexOf(varName)
          this.setState({
            variableNames: [...this.state.variableNames.slice(0, clickedIndex), ...this.state.variableNames.slice(clickedIndex + 1, this.state.variableNames.length)],
            currentVar: this.state.variableNames[this.state.variableNames.length - 1],
            variableData: [...this.state.variableData.slice(0, clickedIndex), ...this.state.variableData.slice(clickedIndex + 1, this.state.variableData.length)]
          });
        })
    }
  }

  render() {
    const variables = this.props.contract.variables
    const abi = this.props.contract.abi;
    const nullContract = this.props.contract.nullContract;

    const CenteredH = styled.h1` text-align: center `;

    if ((!abi || abi.length === 0) && !nullContract) {
      return <CenteredH> No ABI for this variable </CenteredH>
    }

    if ((!variables || variables.length === 0) && !nullContract) {
      return <CenteredH> No variables in this contract </CenteredH>
    }

    const seriesOptions = this.state.variableNames.map((name, i) =>
      ({name, data: this.state.variableData[i],
        tooltip: {
          valueDecimals: 2,
          split: true
        }}));


    const graph = (this.state.variableData.length === 0) ? null
      : (<ReactHighstock
        config={{
          rangeSelector: { selected: 1 },
          title: { text: 'Smart Contract Explorer' },
          series: seriesOptions,
          credits: { enabled: false }
        }}
       />)

      return (
        <div>
          <VariableSelection variables={variables} selectedVariables={this.state.variableNames}
                             variableClicked={this.variableClicked}/>

          {graph}
        </div>
      )

  }
}

export default ContractViewer