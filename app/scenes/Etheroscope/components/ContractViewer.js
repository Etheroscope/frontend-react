import React from 'react'
import ReactDOM from 'react-dom'
import VariableSelection from './VariableSelection'
import fetchJson from './../xhr'

// const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
const ReactHighstock = require('react-highcharts/ReactHighstock')

// Highcharts config
// Load config with api values after clicking on favourite
// const config = ;

class ContractViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentVariable: null, variableData: [] };
    this.variableClicked = this.variableClicked.bind(this)
  }

  fetchVariableHistory(varName) {
      const url = `/contracts/${this.props.contract.address}/history?variable=${varName}`;
      return fetchJson(url);
  }

  variableClicked(varName) {
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
    })
  }

  render() {
    const variables = this.props.contract.variables;
    const name = "test";
    const data = [
        [1290038400000,44.06],
        [1290124800000,43.82],
        [1290384000000,44.77],
        [1290470400000,44.10],
        [1290556800000,44.97],
        [1290729600000,45.00],
        [1290988800000,45.27],
        [1291075200000,44.45],
        [1291161600000,45.20],
        [1291248000000,45.45],
        [1291334400000,45.35],
        [1291593600000,45.74],
        [1291680000000,45.46],
        [1291766400000,45.86],
        [1291852800000,45.68],
        [1291939200000,45.79],
        [1292198400000,45.95],
        [1292284800000,45.76],
        [1292371200000,45.77],
        [1292457600000,45.89],
        [1292544000000,45.80],
        [1292803200000,46.03],
        [1292889600000,46.32],
        [1292976000000,46.45],
        [1293062400000,46.23],
        [1293408000000,46.38],
        [1293494400000,46.50],
        [1293580800000,46.47],
        [1293667200000,46.24],
        [1293753600000,46.08],
        [1294012800000,47.08],
        [1294099200000,47.33],
        [1294185600000,47.71],
        [1294272000000,47.68],
        [1294358400000,48.02],
        [1294617600000,48.92],
        [1294704000000,48.81],
        [1294790400000,49.20],
        [1294876800000,49.38],
        [1294963200000,49.78],
        [1295308800000,48.66],
        [1295395200000,48.41],
        [1295481600000,47.53],
        [1295568000000,46.67],
        [1295827200000,48.21],
        [1295913600000,48.77],
        [1296000000000,49.12],
        [1296086400000,49.03],
        [1296172800000,48.01],
        [1296432000000,48.47]];

    const aapl = {
        name: "aapl",
        data: data
    };

    const msftData = [
        [1290038400000,25.84],
        [1290124800000,25.69],
        [1290384000000,25.73],
        [1290470400000,25.12],
        [1290556800000,25.37],
        [1290729600000,25.25],
        [1290988800000,25.31],
        [1291075200000,25.26],
        [1291161600000,26.04],
        [1291248000000,26.89],
        [1291334400000,27.02],
        [1291593600000,26.84],
        [1291680000000,26.87],
        [1291766400000,27.23],
        [1291852800000,27.08],
        [1291939200000,27.34],
        [1292198400000,27.24],
        [1292284800000,27.62],
        [1292371200000,27.85],
        [1292457600000,27.99],
        [1292544000000,27.90],
        [1292803200000,27.81],
        [1292889600000,28.07],
        [1292976000000,28.19],
        [1293062400000,28.30],
        [1293408000000,28.07],
        [1293494400000,28.01],
        [1293580800000,27.97],
        [1293667200000,27.85],
        [1293753600000,27.91]
    ];

    const msft = {
        name: "msft",
        data: msftData
    }

    const seriesOptions =
        [
            // {
            //     name: "Explorer",
            //     data: this.state.variableData,
            //     tooltip: {
            //         valueDecimals: 2,
            //         split: true
            //     }
            // },
            msft,
            aapl
        ];


    console.log(seriesOptions);

    function createChart(options) {
      return (
        <ReactHighstock
          config={{

              rangeSelector: {
                  selected: 1
              },

              title: {
                  text: 'Smart Contract Explorer'
              },

              yAxis: {
                  labels: {
                      formatter: function () {
                          return (this.value > 0 ? ' + ' : '') + this.value + '%';
                      }
                  },
                  plotLines: [{
                      value: 0,
                      width: 2,
                      color: 'silver'
                  }]
              },

              plotOptions: {
                  series: {
                      compare: 'percent',
                      showInNavigator: true
                  }
              },

              series: options,

              credits: {
                  enabled: false
              }
          }}
        />
      )
    }

    return (
      <div>
        {variables.length > 0
          ? <VariableSelection variables={variables} variableClicked={this.variableClicked} />
          : <p style={{ textAlign: 'center' }}>No variables in this contract</p> 
        },
        {createChart(seriesOptions)}
      </div>
    )
  }
}

export default ContractViewer
