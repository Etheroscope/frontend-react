import React from 'react'
import ReactDOM from 'react-dom'
import VariableSelection from './VariableSelection';
import fetchJson from './xhr'

// const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
const ReactHighstock = require('react-highcharts/ReactHighstock')

// Highcharts config
// Load config with api values after clicking on favourite
// const config = ;

class ContractViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentVariable: null, variableData: [] };
    this.variableClicked = this.variableClicked.bind(this);
  }

  fetchVariableHistory(varName) {
    var url = '/contracts/' + this.props.contract.address + '/history?variable=' + varName;
    return fetchJson(url);
  }

  variableClicked(varName) {
    console.log(varName);
    this.fetchVariableHistory(varName)
      .then(history => {
        const processedHistory = history.map(item => {
          item.value = parseFloat(item.value);
          return [item.time * 1000, item.value]
        });
        this.setState({
          currentVariable: varName,
          variableData: processedHistory.sort()

        });
        console.log(this.state.variableData);
      })

  }

  render() {
    return (
      <div>
        <VariableSelection variables={this.props.contract.variables} variableClicked={this.variableClicked}/>
        <ReactHighstock
          config={{

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Smart Contract Explorer'
            },


            series: [
                {
                    name: "Explorer",
                    data: this.state.variableData,
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ]
        }}
        />
      </div>
    )
  }
}

export default ContractViewer
