import React from 'react'
import styled from 'styled-components'

const favourites = [
  { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
  { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
]

export default class Favourites extends React.Component {

  render() {
    const Section = styled.section`
      margin-bottom: '15px';
    `
    const Link = styled.a`
      color: 'white';
      marginRight: '10px';
      borderBottom: 'white 1px solid';
      textDecoration: 'none';
      cursor: 'pointer';
    `

    return (
      <Section>
        <span>Favourites: </span>
        {favourites.map(fav =>
          <Link key={fav.address}
                onClick={() => this.props.handleClick(fav.address)}>{fav.name}</Link>
        )}
      </Section>
    )
  }

}
