/* eslint-disable react/prop-types,no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
// Don't remove ReactDOM; needed for highstocks
import styled from 'styled-components'
import ReactHighstock from 'react-highcharts/ReactHighstock'

import VariableSelection from './VariableSelection'
import { fetchJson, postJson } from "../xhr"

const GraphOption = styled.button`
    justify-content: center;
    background-color: #4B6575;
    color: #f9f9f9;
    min-height: 30px;
    width:100%;
    margin: 5px 0;    
`

const CenteredH2 = styled.h2`
  text-align: center;
`


const Variables = styled(VariableSelection)`
  display: flex;
  justify-content: stretch;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const GraphCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`
const OptsCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`

const selectedButtonStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px #4B6575 solid',
  color: '#4B6575'
}

class ContractGraph extends React.Component {
  constructor(props) {
    super(props)
    const variables = {}
    this.props.contract.variables.forEach(varName => variables[varName] = {
      selected: false,
      downloading: false,
      progress: -1,
      data: [],
    });

    this.state = {
      variables,
      graphOptions: {
        Crosshair: false,
        Logarithmic_Scale: false,
        Navigator: false,
        Percent_Change: false
      },
      orgName: null,
      logError: false
    }
    this.variableClicked = this.variableClicked.bind(this)
    this.handleOptionClicked = this.handleOptionClicked.bind(this)
  }

  static allPositiveValues(arr) {
    return arr.every(series => series.every(([_, v]) => (v > 0)))
  }

  handleOptionClicked(option) {
    if (option === 'Logarithmic_Scale'
      && !ContractGraph.allPositiveValues(Object.values(this.state.variables).filter(v => v.selected).map(v => v.data))) {
      this.setState({ logError: true })
    } else {
      this.state.graphOptions[option] = !this.state.graphOptions[option];
      this.setState({ graphOptions: this.state.graphOptions, logError: false })
    }
  }

  fetchVariableHistory(varName) {
    const url = `/contracts/${this.props.address}/history/${varName}`
    return fetchJson(url).then(result => {
      switch (result.status) {
        case 200:
          const processedHistory = result.response.data.map(item => {
            item.value = parseFloat(item.value)
            return [item.time * 1000, item.value]
          }).sort()
          this.state.variables[varName] = {
            selected: true,
            downloading: false,
            progress: 100,
            data: processedHistory
          }
          this.setState({ variables: this.state.variables })
          break;
        case 503:
          // Caching - display status & keep the user updates & give email notification option
          if (!this.state.variables[varName].downloading) return
          const progress = result.response * 50 + result.status === 'processing' ? 50 : 0
          setTimeout(() => {
            this.fetchVariableHistory(varName)
          }, 1500)
          this.state.variables[varName].progress = progress
          this.setState({ variables: this.state.variables })
          break
        case 404:
          // Send the initial request
          postJson(url).then(result => {
            if (result.status !== 201 && result.status !== 204) {
              throw new Error('Bad response from the server')
            }
          }).then(() => this.fetchVariableHistory(varName))
          break
        default:
          throw new Error('Unknown response from the server')
      }
    })
  }

  variableClicked(varName) {
    const variables = this.state.variables
    const variable = variables[varName]
    if (variable.selected || variable.downloading) {
      variable.selected = false
      variable.downloading = false
      return this.setState({ variables })
    }
    variable.downloading = true
    variable.progress = -1
    this.setState({ variables })
    this.fetchVariableHistory(varName)
  }

  render () {
    const highstocksConfig = {
      title: { text: 'Smart Contract Explorer' },
      yAxis: {
        crosshair: this.state.graphOptions.Crosshair,
        type: (this.state.graphOptions.Logarithmic_Scale) ? 'logarithmic' : 'linear'
      },
      navigator: { enabled: this.state.graphOptions.Navigator },

      chart: { backgroundColor: '#efefef' },
      tooltip: {
        shared: true,
        valueDecimals: 0,
        split: true
      },

      plotOptions: {
        series: {
          compare: (this.state.graphOptions.Percent_Change) ? 'percent' : undefined,
          showInNavigator: true
        }
      },
      series: Object.entries(this.state.variables)
        .filter(([_, { selected }]) => selected)
        .map(([varName, { data }]) => ({ name: varName, data })),
      credits: { enabled: false }
    }
    return (
      <Row>
        <GraphCol>
          <ReactHighstock config={highstocksConfig} />
          <Variables
            address={this.props.address}
            variables={this.state.variables}
            variableClicked={this.variableClicked}
          />
          {this.state.logError && <p>Sorry cannot display log graph with zeroes or negative values</p>}
        </GraphCol>
        <OptsCol>
          <CenteredH2>Options</CenteredH2>
          {Object.entries(this.state.graphOptions).map(([option, selected], index) =>
            (<GraphOption key={index} style={selected ? selectedButtonStyle : {}} onClick={() => this.handleOptionClicked(option)}>
              {option.replace(/_/g, ' ')}
            </GraphOption>)
          )}
        </OptsCol>
      </Row>
    )
  }
}

export default ContractGraph
