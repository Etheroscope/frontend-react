import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: #1998a2;
  border-radius: 4px;
  width: 49.5%;
  height: auto;
  margin-top: 8px;
  margin-bottom: 8px;
  color: white;
`
const Container = styled.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
`
const Title = styled.h3`
  text-align: center;
`
const Link = styled.a`
  color: white;
`
const ContractList = styled.ul`
  list-style: none;
`
const FavImage = styled.img`
  position: absolute;
  top: 0px;
  right: 10px;
  width: 20px;
  height: 20px;
`

class ContractCard extends React.Component {

  constructor(props) {
    super(props)
    this.alterStorage = this.alterStorage.bind(this)
    this.retrieveFavourites = this.retrieveFavourites.bind(this)
    this.retrieveFavourites(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.retrieveFavourites(nextProps)
  }

  retrieveFavourites (properties) {
    const favourites = localStorage.favourites && JSON.parse(localStorage.favourites) || []

    var favourite = false
    for (var i = 0; i < favourites.length; i++) {
      if (favourites[i].name === properties.organisation.name) {
        favourite = true
        break
      }
    }

    this.state = { favourite }
  }

  alterStorage (organisation) {
    if (!localStorage.favourites) {
      localStorage.favourites = JSON.stringify([])
    } else {
      const storage = JSON.parse(localStorage.favourites)
      if (!this.state.favourite) {
        this.setState({ favourite: true })
        storage.push(organisation)
      } else {
        this.setState({ favourite: false })
        for (var j = 0; j < storage.length; j++) {
          if (storage[j].name === organisation.name) {
            storage.splice(j, 1)
          }
        }
      }
      localStorage.favourites = JSON.stringify(storage)
    }
  }

  render() {
    const { organisation } = this.props
    const { name, description, url, contracts } = organisation
    return (
      <Card>
        <Container>
          <FavImage
            style={{ backgroundColor: this.state.favourite && 'yellow'}}
            alt="" src="https://cdn.onlinewebfonts.com/svg/img_330749.png" 
            onClick={() => this.alterStorage(organisation)}
          />
          <Title>{name}</Title>
          <p>Description: {description}</p>
          <p>Website: <Link href={url}>{url}</Link></p>
          <p>Contracts:</p>
          <ContractList>
            {contracts.map((contract, contractKey) => (
              <Link key={contractKey} href={`/searchresults?${contract}`}><li>{contract}</li></Link>
            ))}
          </ContractList>
        </Container>
      </Card>
    )
  }
}

export default ContractCard