export const contracts = [
  {
    address: '0xa120Fd6CEc5733b544BC5276a815716F31951C35',
    description: 'Minting contract: this contract mints tokens representing the value of donations made in fiat',
    organisation: 'Alice'
  }, {
    address: '0xBd897c8885b40d014Fb7941B3043B21adcC9ca1C',
    description: 'Donations: the main contract storing donations made to the London Street Impact: 15 Lives (LSI:15L) appeal',
    organisation: 'Alice'
  }, {
    address: '0x2299B133551318fC3C34Bf81b46694651dA11282',
    description: 'Registry contract: this contract keeps track of donor balances and goals achieved',
    organisation: 'Alice'
  }, {
    address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
    description: 'A contract belonging to the DAO.',
    organisation: 'The DAO'
  }, {
    address: '0xf0160428a8552ac9bb7e050d90eeade4ddd52843',
    description: 'This contract holds the funds raised by Digix during their ICO.',
    organisation: 'Digix Crowdsale'
  }, {
    address: '0x7da82C7AB4771ff031b66538D2fB9b0B047f6CF9',
    description: 'This multisig contract contains the funds raised by Golem during their ICO.',
    organisation: 'Golem'
  }, {
    address: '0x3BfC20f0B9aFcAcE800D73D2191166FF16540258',
    description: 'This is the multisig address of the Polkadot ICO.',
    organisation: 'Polkadot'
  }, {
    address: '0xcafE1A77e84698c83CA8931F54A755176eF75f2C',
    description: 'Multisig contract for the Aragon ICO.',
    organisation: 'Aragon'
  }, {
    address: '0x851b7F3Ab81bd8dF354F0D7640EFcD7288553419',
    description: 'Multisig contract for the Gnosis ICO.',
    organisation: 'Gnosis Auction Wallet'
  }, {
    address: '0x376c3E5547C68bC26240d8dcc6729fff665A4448',
    description: 'Multisig contract for the Iconomi ICO.',
    organisation: 'Iconomi'
  }, {
    address: '0x00C7122633A4EF0BC72f7D02456EE2B11E97561e',
    description: 'Raiden multisig wallet containing the funds raised during the RDN token sale as well as the unsold RDN tokens.',
    organisation: 'Raiden'
  }, {
    address: '0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650',
    description: 'Kyber multisig account containing the funds raised during the Kyber network (KNC) ICO.',
    organisation: 'Kyber'
  }
]

const orgsWithoutContracts = [{
  name: 'Alice',
  description: 'Alice is a platform that brings transparency to social funding through blockchain technology.',
  url: 'http://alice.si'
}, {
  name: 'The DAO',
  description: 'The DAO was a digital decentralized autonomous organization and a form of investor-directed venture capital fund.',
  url: 'https://blog.daohub.org/'
}, {
  name: 'Digix Crowdsale',
  description: 'Digix provides a token (DGX) that is backed by gold: 1DGX = 1 gram of gold',
  url: 'https://digix.global/'
}, {
  name: 'Golem',
  description: 'Golem aims to create a worldwide supercomputer by letting any user rent out cycles of other users\' machines with ether payments.',
  url: 'https://golem.network/'
}, {
  name: 'Polkadot',
  description: 'Polkadot is creating the technology for interoperable blockchains.',
  url: 'https://polkadot.io/'
}, {
  name: 'Aragon',
  description: 'The Aragon Network is a digital jurisdiction that will make decentralized organizations very efficient.',
  url: 'https://aragon.one/'
}, {
  name: 'Gnosis Auction Wallet',
  description: 'Built on the ethereum blockchain, Gnosis is a permissionless and decentralised platform.',
  url: 'https://gnosis.pm/'
}, {
  name: 'Iconomi',
  description: 'Iconomi is a technical service that allows anyone to invest in and manage digital assets.',
  url: 'https://www.iconomi.net/'
}, {
  name: 'Raiden',
  description: 'The Raiden Network is an off-chain scaling solution, enabling near-instant, low-fee and scalable payments. It is currently work in progress.',
  url: 'https://raiden.network/'
}, {
  name: 'Kyber',
  description: 'KyberNetwork is a system which allows the exchange and conversion of digital assets. It has a payment and API and a wallet and provides support for derivative trading.',
  url: 'https://kyber.network/'
}];

export const popularOrgs = orgsWithoutContracts.map(org => ({
  ...org,
  contracts: contracts.filter(contract => contract.organisation === org.name)
}))

