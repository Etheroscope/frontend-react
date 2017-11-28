import React from 'react'
import styled from 'styled-components'

const favourites = [
  { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
  { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
]

export default class Favourites extends React.Component {

  render() {
    const Section = styled.section`
      margin-bottom: 15px;
    `
    const FavouriteLink = styled.a`
      color: white;
      margin-right: 10px;
      border-bottom: white 1px solid;
      text-decoration: none;
      cursor: pointer;
    `

    return (
      <Section>
        <span>Favourites: </span>
        {localStorage.map(fav =>
          (<FavouriteLink key={fav.address} onClick={() => this.props.handleClick(fav.address)}>
            {fav.name}
          </FavouriteLink>)
        )}
      </Section>
    )
  }
}
