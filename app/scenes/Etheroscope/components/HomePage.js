import React from 'react'
import styled from 'styled-components'

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

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.setCategory = this.setCategory.bind(this)
    this.state = {
      organisations: this.props.route.popularOrgs,
      category: 'popular'
    };
  }

  setCategory(category) {
    const favourites = localStorage.favourites && JSON.parse(localStorage.favourites) || []
    const recent = localStorage.recent && JSON.parse(localStorage.recent) || []

    switch (category) {
      case 'favourites':
        this.setState({organisations: favourites, category: 'favourites'})
        break
      case 'recent':
        this.setState({organisations: recent, category: 'recent'})
        break
      case 'popular':
      default:
        this.setState({organisations: this.props.route.popularOrgs, category: 'popular'})
        break
    }
  }

  render() {
    const {organisations, category} = this.state

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
            <Box onClick={() => this.setCategory('popular')}>Popular</Box>
            <SelectedBox onClick={() => this.setCategory('recent')} >Recent</SelectedBox>
            <Box onClick={() => this.setCategory('favourites')}>Favourites</Box>
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
          organisations.map((organisation, key) => <ContractCard organisation={organisation} key={key} />)
          }
        </ContractGrid>
      </Wrapper>
    )
  }
}
