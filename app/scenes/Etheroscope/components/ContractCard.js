import React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Card = styled.div`
  background-color: #4B6575;
  border-radius: 3px;
  width: 49.5%;
  height: auto;
  margin-top: 8px;
  margin-bottom: 8px;
  color: #f9f9f9;
  overflow-x: auto;
`
const Container = styled.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
`
const Title = styled.h3`
  text-align: center;
  cursor: pointer;
`
const Link = styled.a`
  color: #f9f9f9;
`
const OrgLink = styled.a`
  color: #f9f9f9;
  text-decoration: none;
`
const ContractList = styled.ul`
  list-style: none;
`
const FavButton = styled.svg`
  position: absolute;
  top: 0px;
  right: 10px;
  width: 20px;
  height: 20px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`
const Copy = styled.span`
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  &:hover {
    color: #3398c0;
  }
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

    let isFavourite = false
    for (let i = 0; i < favourites.length; i++) {
      if (favourites[i].name === properties.organisation.name) {
        isFavourite = true
        break
      }
    }
    this.state = { isFavourite }
  }

  alterStorage (organisation) {
    if (!localStorage.favourites) {
      localStorage.favourites = JSON.stringify([])
    }
    const storage = JSON.parse(localStorage.favourites)
    if (!this.state.isFavourite) {
      this.setState({ isFavourite: true })
      storage.push(organisation)
    } else {
      this.setState({ isFavourite: false })
      for (let j = 0; j < storage.length; j++) {
        if (storage[j].name === organisation.name) {
          storage.splice(j, 1)
        }
      }
    }
    localStorage.favourites = JSON.stringify(storage)
  }

  render() {
    const { organisation } = this.props
    const { name, description, url, contracts } = organisation
    return (
      <Card>
        <Container>
          <FavButton xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" onClick={() => this.alterStorage(organisation)}>
            <title>Favourites button - {this.state.isFavourite ? 'favourited' : 'not favourited'}</title>
            <path stroke={this.state.isFavourite ? "#ffef00" : '#f9f9f9'} strokeWidth="39" fill={this.state.isFavourite ? '#ffef00' : 'none'} d="m 754.09491,979.79409 c -11.06462,0 -22.12926,-2.8396 -32.0189,-8.32297 L 506.26658,851.81636 c -3.91667,-2.15417 -8.61671,-2.15417 -12.53339,0 L 278.02168,971.37321 c -27.31888,15.17717 -62.76489,8.32296 -82.74,-15.17715 -12.5334,-14.78549 -17.91885,-34.27101 -14.78549,-53.65861 l 42.10438,-259.18673 c 0.68542,-4.11251 -0.68542,-8.32295 -3.52503,-11.26048 L 39.103819,446.92889 C 21.674559,429.01006 15.799529,403.06202 23.73082,379.36605 31.66211,355.67011 51.930972,338.63253 76.606081,334.81374 L 321.88857,297.31148 c 4.30835,-0.68544 7.93129,-3.4271 9.79171,-7.3438 L 439.97666,58.393602 c 11.06464,-23.500119 33.97727,-38.187693 60.02323,-38.187693 26.04596,0 49.05649,14.687574 60.02322,38.285613 L 668.4174,289.96768 c 1.86044,3.9167 5.48336,6.75629 9.79172,7.3438 l 245.28248,37.60018 c 24.67514,3.81877 44.84607,20.85637 52.77737,44.45439 7.93128,23.79388 2.05624,49.64401 -15.373,67.56284 L 780.92423,631.99233 c -2.83961,2.93752 -4.21044,7.14796 -3.52502,11.26047 l 42.10438,259.28465 c 3.13334,19.28968 -2.2521,38.87312 -14.88342,53.65861 -12.6313,14.98133 -31.13765,23.59803 -50.52526,23.59803 z" />
          </FavButton>
          <OrgLink href={'/organisations/' + name}><Title>{name}</Title></OrgLink>
          <p>Description: {description}</p>
          <p>Website: <Link href={url}>{url}</Link></p>
          <p>Contracts:</p>
          <ContractList>
            {contracts.map((contract, contractKey) => {
              const address = contract.address
              return (
                <Row key={contractKey}>
                  <Link href={'/contracts/' + address}>
                    <li>{address}</li>
                  </Link>
                  <CopyToClipboard text={address}>
                    <Copy><i className={"fa fa-copy"}/></Copy>
                  </CopyToClipboard>
                </Row>
              )
            })}
          </ContractList>
        </Container>
      </Card>
    )
  }
}

export default ContractCard
