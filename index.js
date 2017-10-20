import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import './index.css'

import EtheroscopeContainer from './app/scenes/Etheroscope'

const favourites = [
  { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
  { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
]

function getContract(address, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        return callback(xmlHttp.response, address)
      }
  }
  const url = `http://etheroscope.alice.si/api/explore/${address}/`
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.send(null);
}

function contractCallback(response, address) {  
  var abi = JSON.parse(response).abi
  var items = []
  abi.forEach(function(item) {
    if (item.outputs && item.outputs.length === 1 && item.outputs[0].type.indexOf('uint') === 0) {
      if (item.inputs.length === 0) {
        items.push(item.name)
      }
    }
  })
  console.log(items)
  return {
    address: address,
    variables: items
  }
}

const getHistory = function (variable, contractAddress) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        return callback(xmlHttp.response)
      }
  }
  const url = 'http://etheroscope.alice.si/api/' + 'getHistory/' + contractAddress + '/' + variable
  xmlHttp.open("GET", url, true) // true for asynchronous 
  xmlHttp.send(null)
}

function historyCallback(response) {
    console.log(response)
    const historyData = JSON.parse(response)
    return {
      data: historyData,
      xmin: historyData[0][0],
      xmax: historyData[historyData.length - 1][0],
      ymax: historyData[historyData.length - 1][1] 
    }
}

const contracts = {
  '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c': {
    address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c',
    variables: [
      {
        name: 'total',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }
    ]
  },
  '0xbb9bc244d798123fde783fcc1c72d3bb8c189413': {
    address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
    variables: [
      {
        name: 'minTokensToCreate',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'totalSupply',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'divisor',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'totalRewardToken',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'actualBalance',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'closingTime',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'minQuorumDivisor',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'proposalDeposit',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'numberOfProposals',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }, {
        name: 'lastTimeMinQuorumMet',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }
    ]
  }
};



  ReactDOM.render(
    <EtheroscopeContainer favourites={favourites} mockContracts={contracts}/>,
    document.getElementById('app')
);

