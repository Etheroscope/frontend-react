import React from 'react';
import styled from 'styled-components'
import fetchJson from './../xhr'
import { prop } from 'ramda'

import ContractCard from './ContractCard.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  border:1px solid white;
  height: 40%;
  width: 95%;
`

// button?
const Box = styled.button`
  background-color:#1998a2;
  cursor: pointer;
  border:1px solid white;
  padding:5px;
  width:33.3%;
  text-align:center;
  background-color: #1998a2;
  color:white;
  &:hover {
    opacity: 0.7;
    background-color: darkblue;
  }
`

const SelectedBox = styled.button`
    cursor: pointer;
    border: 1px solid #1998a2;
    padding: 5px;
    width: 33.3%;
    text-align: center;
    background-color: white;
    color: #1998a2;
`

const ContractGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding-top: 10px;
  width: 95%;
  margin: auto;
`
const NoContractText = styled.p`
  text-align: center;
`

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.setCategory = this.setCategory.bind(this)
    // this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      category: 'popular'
    };
  }

  componentWillMount() {
    this.setCategory('popular')
  }

  setCategory(category) {
    const popular = [{
      name: "Alice",
      description: "Alice is a platform that brings transparency to social funding through blockchain technology.",
      url: "http://alice.si",
      contracts: [
        "0xBd897c8885b40d014Fb7941B3043B21adcC9ca1C"
      ]
    },
      {
        name: "The DAO",
        description: "The DAO was a digital decentralized autonomous organization and a form of investor-directed venture capital fund.",
        url: "https://blog.daohub.org/",
        contracts: [
          "0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
        ]
      },
      {
        name: "Eth Dev",
        description: "This contract is controlled by the ethereum team and was used to hold and then distribute the 12 million ether out of the 72 million total that were not generated by the crowdsale contributors.",
        url: "https://ethereum.org/",
        contracts: [
          "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
        ]
      },
      {
        name: "Digix Crowdsale",
        description: "This contract holds the funds raised by Digix during their ICO. Digix provides a token (DGX) that is backed by gold: 1DGX = 1 gram of gold",
        url: "https://digix.global/",
        contracts: [
          "0xf0160428a8552ac9bb7e050d90eeade4ddd52843"
        ]
      },
      {
        name: "Golem",
        description: "This multisig contract contains the funds raised by Golem during their ICO. Golem aims to create a worldwide supercomputer by letting any user rent out cycles of other users' machines with ether payments.",
        url: "https://golem.network/",
        contracts: [
          "0x7da82C7AB4771ff031b66538D2fB9b0B047f6CF9"
        ]
      },
      {
        name: "Polkadot",
        description: "This is the multisig address of the Polkadot ICO. Polkadot is creating the technology for interoperable blockchains.",
        url: "https://polkadot.io/",
        contracts: [
          "0x3BfC20f0B9aFcAcE800D73D2191166FF16540258"
        ]
      },
      {
        name: "Aragon",
        description: "Multisig contract for the Aragon ICO. The Aragon Network is a digital jurisdiction that will make decentralized organizations very efficient.",
        url: "https://aragon.one/",
        contracts: [
          "0xcafE1A77e84698c83CA8931F54A755176eF75f2C"
        ]
      },
      {
        name: "Gnosis Auction Wallet",
        description: "Multisig contract for the Gnosis ICO. Built on the ethereum blockchain, Gnosis is a permissionless and decentralised platform.",
        url: "https://gnosis.pm/",
        contracts: [
          "0x851b7F3Ab81bd8dF354F0D7640EFcD7288553419"
        ]
      }
    ]

    const favourites = localStorage.favourites && JSON.parse(localStorage.favourites) || []
    const recent = []

    switch (category) {
      case 'favourites':
        this.setState({organisations: favourites, category: 'favourites'})
        break
      case 'recent':
        this.setState({organisations: recent, category: 'recent'})
        break
      case 'popular':
      default:
        this.setState({organisations: popular, category: 'popular'})
        break
    }
  }

  render() {
    const {organisations} = this.state
    const category = this.state.category

    let displayButtons = null
    switch (category) {
      case 'popular':
        displayButtons =
          (<Navbar>
            <SelectedBox onClick={() => this.setCategory('popular')} >Popular</SelectedBox>
            <Box onClick={() => this.setCategory('recent')} >Recent</Box>
            <Box onClick={() => this.setCategory('favourites')} >Favourites</Box>
          </Navbar>)
        break
      case 'favourites':
        displayButtons =
          (<Navbar>
            <Box onClick={() => this.setCategory('popular')}>Popular</Box>
            <Box onClick={() => this.setCategory('recent')}>Recent</Box>
            <SelectedBox onClick={() => this.setCategory('favourites')} >Favourites</SelectedBox>
          </Navbar>)
        break
      case 'recent':
        displayButtons =
          (<Navbar>
            <Box type="submit" onClick={() => this.setCategory('popular')}>Popular</Box>
            <SelectedBox type="submit" onClick={() => this.setCategory('recent')} >Recent</SelectedBox>
            <Box type="submit" onClick={() => this.setCategory('favourites')}>
              Favourites</Box>
          </Navbar>)
        break
      default:
        displayButtons =
          (<Navbar>
            <Box type="submit" onClick={() => this.setCategory('popular')}>Popular</Box>
            <Box type="submit" onClick={() => this.setCategory('recent')}>Recent</Box>
            <Box type="submit" onClick={() => this.setCategory('favourites')}>Favourites</Box>
          </Navbar>)
    }

    return (
      <Wrapper>
        {displayButtons}
        <ContractGrid>
          {organisations &&
          organisations.map((organisation, key) => <ContractCard organisation={organisation} key={key}/>)
          }
        </ContractGrid>
      </Wrapper>
    )
  }
}
