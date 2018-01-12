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

const SelectedGraphOption = styled.button`
    justify-content: center;
    background-color: #f9f9f9;
    border: 1px #4B6575 solid;
    color: #4B6575;
    min-height: 30px;
    width: 100%;
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

class ContractGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variableNames: [],
      currentVar: null,
      variableData: [],
      downloadingVariables: {},
      graphOptions: {
        'Crosshair': false,
        'Logarithmic_Scale': false,
        'Navigator': false,
        'Percent_Change': false
      },
      orgName: null,
      logError: false
    }
    this.variableClicked = this.variableClicked.bind(this)
    this.handleOptionClicked = this.handleOptionClicked.bind(this)
  }

  static allPositiveValues(arr) {
    return arr.every(series => series.every(([_,v]) => (v > 0)))
  }

  handleOptionClicked(option) {
    if (option === 'Logarithmic_Scale' && !ContractGraph.allPositiveValues(this.state.variableData)) {
      this.setState({logError: true})
    } else {
      const tempOptions = this.state.graphOptions
      tempOptions[option] = !tempOptions[option]
      this.setState({graphOptions: tempOptions, logError: false})
    }
  }

  fetchVariableHistory(varName, interval) {
    const url = `/contracts/${this.props.address}/history/${varName}`
    return fetchJson(url).then(result => {
      switch (result.status) {
        case 200:
          clearInterval(interval)
          delete this.state.downloadingVariables[varName]
          this.setState({ downloadingVariables: this.state.downloadingVariables})
          const history = result.response.data;
          const processedHistory = history.map(item => {
            item.value = parseFloat(item.value)
            return [item.time * 1000, item.value]
          })

          this.setState({
            variableNames: [...this.state.variableNames, varName],
            currentVar: varName,
            variableData: [...this.state.variableData, processedHistory.sort()]
          })
          break
        case 503:
          // Caching - display status & keep the user updates & give email notification option
          const downloadingVariables = this.state.downloadingVariables
          downloadingVariables[varName] = result.response
          this.setState({ downloadingVariables })
          if (!interval) {
            const interval = setInterval(() => {
              this.fetchVariableHistory(varName, interval)
            }, 2000);
          }
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
    this.fetchVariableHistory(varName);
  }

  render () {
    const highstocksConfig = {
      rangeSelector: { selected: 1 },
      title: { text: 'Smart Contract Explorer' },
      yAxis: {
        crosshair: this.state.graphOptions.Crosshair,
        type: (this.state.graphOptions.Logarithmic_Scale) ? 'logarithmic' : 'linear'
      },
      navigator: { enabled: this.state.graphOptions.Navigator },

      chart: { backgroundColor: '#efefef' },
      tooltip: {
        shared: true,
        valueDecimals: 2,
        split: true
      },

      plotOptions: {
        series: {
          compare: (this.state.graphOptions.Percent_Change) ? 'percent' : 'value',
          showInNavigator: true
        }
      },
      series: this.state.variableNames.map((name, i) =>
        ({
          name, data: this.state.variableData[i],
          tooltip: {
            valueDecimals: 2,
            split: true
          }
        })),
      credits: { enabled: false }
    }
    return (
      <Row>
        <GraphCol>
          <ReactHighstock config={highstocksConfig}/>
          <Variables
            address={this.props.address}
            variables={this.props.contract.variables}
            selectedVariables={this.state.variableNames}
            downloadingVariables={this.state.downloadingVariables}
            variableClicked={this.variableClicked}
          />
        </GraphCol>
        <OptsCol>
          <CenteredH2>Options</CenteredH2>
          {Object.entries(this.state.graphOptions).map(([option, selected], index) => (selected)
            ? (<SelectedGraphOption key={index}
                                    onClick={() => this.handleOptionClicked(option)}> {option.replace(/_/g, ' ')} </SelectedGraphOption>)
            : (<GraphOption key={index}
                            onClick={() => this.handleOptionClicked(option)}> {option.replace(/_/g, ' ')} </GraphOption>)
          )}
        </OptsCol>
      </Row>
    )
  }
}

export default ContractGraph
