import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import './index.css'

import EtheroscopeContainer from './app/scenes/Etheroscope'

const favourites = [
  { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
  { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
];

const contracts = {
  '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c': {
    variables: [
      {
        name: 'total',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
      }
    ]
  },
  '0xbb9bc244d798123fde783fcc1c72d3bb8c189413': {
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

