/* eslint-disable react/prop-types,no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
// Don't remove ReactDOM; needed for highstocks
import VariableSelection from './VariableSelection'
import styled from 'styled-components'
import { equals, prop } from 'ramda'
import { fetchJson, postJson } from "../xhr"

import fetchEtherscan from './../etherscan'
import { contracts } from '../organisationContractData'

const ReactHighstock = require('react-highcharts/ReactHighstock')

const GraphOption = styled.button`
   justify-content: center;
    background-color: #4B6575;
    color: #f9f9f9;
    min-height: 30px;
    width:100%;
`

const SelectedGraphOption = styled.button`
    justify-content: center;
    background-color: #f9f9f9;
    color: #4B6575;
    min-height: 30px;
    width: 100%;
`

const Separator = styled.div`
  height:1px;
  background:#4B6575;
  border-bottom:1px solid #4B6575;
`

const InWrapper = styled.div`
  display: inline-block;
`

const CenteredH2 = styled.h2`
  text-align: center;
`

const CenteredH3 = styled.h3`
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
//  display: inline-block;
`
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 400px;
  padding-top: 20px;
`

const Centered = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

const Variables = styled(VariableSelection)`
  display: flex;
  justify-content: stretch;
`

const Heading = styled.h1`
  text-align: center;
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

class ContractViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variableNames: [],
      currentVar: null,
      variableData: [],
      downloadingVariables: {},
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

  static findOrganisationName(addr) {
    const entries = Object.values(contracts)
    for (let i = 0; i < entries.length; i++) {
      if(entries[i].address === addr) {
        return(entries[i].organisation)
      }
    }
    return addr
  }

  static allPositiveValues(arr) {
    return arr.every(series => series.every(([_,v]) => (v > 0)))
  }

  handleOptionClicked(option) {
    console.log(option)
    console.log(this.state.variableData)
    if (option === 'Logarithmic_Scale' && !ContractViewer.allPositiveValues(this.state.variableData)) {
      console.log("bad log")
      this.setState({logError: true})
    } else {
      const tempOptions = this.state.graphOptions
      tempOptions[option] = !tempOptions[option]
      this.setState({graphOptions: tempOptions, logError: false})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (prop('address', nextProps.contract) && !equals(this.props.contract, nextProps.contract)) {
      const url = `/api?module=account&action=balance&address=${nextProps.contract.address}&tag=latest&apikey=AJAF8TPSIH2TBUGQJTI2VU98NV3A3YFNCI`
      fetchEtherscan(url).then(response => this.setState({ balance: response.status === '1' ? `${response.result / 1000000000000000000} ETH` : `0 WEI` }))
      this.setState({orgName: ContractViewer.findOrganisationName(nextProps.contract.address), variableData:[] })
    }
  }

  fetchVariableHistory(varName, spawnInterval = true) {
    const url = `/contracts/${this.props.contract.address}/history/${varName}`
    return fetchJson(url).then(result => {
      switch (result.status) {
        case 200:
          delete this.state.downloadingVariables[varName];
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
          if (spawnInterval) {
            setInterval(() => {
              this.fetchVariableHistory(varName, false)
            }, 1000);
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
    const contract = this.props.contract
    console.log(contract)
    const org = this.state.orgName && this.state.orgName.length > 0
      ? ` (${this.state.orgName})` : ''
    const balance = this.state.balance ? ` - Balance: ${this.state.balance}` : ''
    const address = contract.address || 'Loading...'
    const heading = address + org + balance
    let graphSection

    if (!contract.abi || contract.abi.length === 0) {
      graphSection = (
        <Centered>
          <h1>No ABI found for this contract</h1>
          <p style={{ width: '80%', margin: 'auto' }}>
            Etheroscope needs an ABI to see what variables a contract contains.
            If you are the contract owner, you can upload the source code for
            your contract <a href="https://etherscan.io/verifyContract?a={contract.address}">here</a>.
            Please note it may take up to 24 hours for the ABI to become
            available after uploading.
          </p>
        </Centered>)
    } else if (!contract.variables || contract.variables.length === 0) {
      graphSection = (
        <Centered>
          <h1>No variables found in the ABI for this contract</h1>
          <p>
            Oops! It looks like this contract doesn't actually contain any
            persistent variables.
          </p>
        </Centered>)
    } else {
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
        credits: { enabled: false },
      }
      graphSection = (
        <Row>
          <GraphCol>
            <ReactHighstock config={highstocksConfig}/>
            <Variables
              emailClicked={variable => this.props.emailHandler(variable, this.props.contract.address)}
              variables={this.props.contract.variables}
              selectedVariables={this.state.variableNames}
              downloadingVariables={this.state.downloadingVariables}
              variableClicked={this.variableClicked}
            />
          </GraphCol>
          <OptsCol>
            <CenteredH2>Options</CenteredH2>
            {Object.entries(this.state.graphOptions).map(([option, selected], index) => selected
              ? (<SelectedGraphOption key={index}
                                      onClick={() => this.handleOptionClicked(option)}> {option.replace(/_/g, ' ')} </SelectedGraphOption>)
              : (<GraphOption key={index}
                              onClick={() => this.handleOptionClicked(option)}> {option.replace(/_/g, ' ')} </GraphOption>)
            )}
          </OptsCol>
        </Row>
      )
    }

    return (
      <Wrapper>
        <Heading>{heading}</Heading>
        {graphSection}
      </Wrapper>
    )
  }
}

export default ContractViewer
