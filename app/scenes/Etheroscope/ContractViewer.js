import React from 'react'

// const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
const ReactHighstock = require('react-highcharts/ReactHighstock')

// Highcharts config
// Load config with api values after clicking on favourite
// const config = ;

class ContractViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentVariable: 'total' };
  }

  render() {
    return (
      <div>
        <ReactHighstock
          config={{

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Smart Contract Explorer'
            },

            // series: [{
            //     name: 'AAPL',
            //     data: this.props.contract.variables.find(variable => variable.name === this.state.currentVariable),
            //     tooltip: {
            //         valueDecimals: 2
            //     }
            // }]
            series: [this.props.contract.variables.find(variable => variable.name === this.state.currentVariable)]
        }}
        />
        <p>Contract viewer</p>
      </div>
    )
  }
}

export default ContractViewer