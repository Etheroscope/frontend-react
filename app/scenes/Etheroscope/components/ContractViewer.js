/* eslint-disable react/prop-types,no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
// Don't remove ReactDOM; needed for highstocks
import VariableSelection from './VariableSelection'
import styled from 'styled-components'
import fetchJson from './../xhr'

const GraphOption = styled.button`
    background-color: #1998a2;
    border: 1px solid white;
    color: white;
    padding: 5px 50px;
`

const SelectedGraphOption = styled.button`
    background-color: white;
    border: 1px solid #1998a2;
    color: #1998a2;
    padding: 5px 50px;
`

const Separator = styled.hr`
`

const Wrapper = styled.div`
  display: inline-block;
`

const CenteredWrapper = styled.div`
  text-align: center;
`

const ReactHighstock = require('react-highcharts/ReactHighstock')

class ContractViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      variableNames: [],
      currentVar: null,
      variableData: [],
      graphOptions: {
        'Crosshair': false,
        'Logarithmic_Scale': false,
        'Navigator': false
      }
    }
    this.variableClicked = this.variableClicked.bind(this)
    this.handleOptionClicked = this.handleOptionClicked.bind(this)
  }

  handleOptionClicked(option) {
    const tempOptions = this.state.graphOptions
    tempOptions[option] = !tempOptions[option]
    this.setState({graphOptions: tempOptions})
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
        .then(() => {
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

    let y_axis = {
      crosshair: this.state.graphOptions.Crosshair,
      type: (this.state.graphOptions.Logarithmic_Scale) ? 'logarithmic' : 'linear'
    }

    const nav = { enabled: this.state.graphOptions.Navigator }

    // Object.entries(this.state.graphOptions).forEach(([option, selected], index) => (selected)
    //   ? console.log(option, " selected")
    //   : console.log(option, " not selected")
    // )

    const graph =
        (<ReactHighstock
        config={{
          rangeSelector: { selected: 1 },
          title: { text: 'Smart Contract Explorer' },
          yAxis: y_axis,
          navigator: nav,
            // {
            // type: 'logarithmic',
            // minorTickInterval: 0.1
            // labels: {
            //   //     formatter: function () {
            //   //         return (this.value > 0 ? ' + ' : '') + this.value + '%';
            //   //     }
            //   // },
            //   plotLines: [{
            //     value: 0,
            //     width: 1000
            //     // color: 'silver'
            //   }]
          // },

          // plotOptions: {
          //   series: {
          //     compare: 'percent',
          //     showInNavigator: true
          //   }
          // },
          series: seriesOptions,
          credits: { enabled: false }
        }}
       />)

      return (
        <div>
          <VariableSelection variables={variables} selectedVariables={this.state.variableNames}
                             variableClicked={this.variableClicked}/>

          {(this.state.variableData.length === 0) ? null :
            <CenteredWrapper>
              {graph}
              <Wrapper>
                <Separator/>
                {Object.entries(this.state.graphOptions).map(([option, selected], index) => (selected)
                  ? (<SelectedGraphOption key={index} onClick={() => this.handleOptionClicked(option)}> {option} </SelectedGraphOption>)
                  : (<GraphOption key={index} onClick={() => this.handleOptionClicked(option)}> {option} </GraphOption>)
                )}
              </Wrapper>
            </CenteredWrapper>
          }

        </div>
      )

  }
}

export default ContractViewer