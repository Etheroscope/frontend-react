import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import './index.css'

import EtheroscopeContainer from './app/scenes/Etheroscope'

// const favourites = [
//   { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
//   { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
//     <EtheroscopeContainer favourites={favourites} />,
// ];

ReactDOM.render(
    <EtheroscopeContainer />,
    document.getElementById('app')
);
