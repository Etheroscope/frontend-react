import React from 'react'

const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

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
        <ReactHighcharts
          config={{
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [this.props.contract.variables.find(variable => variable.name === this.state.currentVariable)]
              // series: [{
              //     data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
              // }]
        }}
        />
        <p>Contract viewer</p>
      </div>
    )
  }
}

export default ContractViewer