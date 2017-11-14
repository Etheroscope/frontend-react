import React from 'react'
import VariableSelection from './VariableSelection';
import fetchJson from '../xhr'

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
    const url = '/contracts/' + address + '/history?variable=' + varName;
    return fetchJson(url);
  }

  variableClicked(varName) {
    fetchVariableHistory(varName)
      .then(history => {
        this.setState({
          currentVariable: varName,
          variableData: history
        });
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
                this.state.variableData,
                {
                    name: "Explorer",
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
