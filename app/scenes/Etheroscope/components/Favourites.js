import React from 'react'
import styled from 'styled-components'

export default class Favourites extends React.Component {

  render() {
    const Section = styled.section`
      margin-bottom: 15px;
    `
    const FavouriteLink = styled.a`
      color: #f9f9f9;
      margin-right: 10px;
      border-bottom: white 1px solid;
      text-decoration: none;
      cursor: pointer;
    `

    const favourites = JSON.parse(localStorage.favourites || '[]')

    return (
      <Section>
        <span>Favourites: </span>
        {favourites.map(fav => fav.contracts.map(contract =>
          (<FavouriteLink key={contract} onClick={() => this.props.handleClick(contract)}>
            {fav.name}
          </FavouriteLink>)
        )
        )}
      </Section>
    )
  }
}
