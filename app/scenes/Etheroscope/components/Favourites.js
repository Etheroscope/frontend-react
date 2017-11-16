import React from 'react'
import styled from 'styled-components'

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
        {this.props.favourites.map(fav =>
          <Link key={fav.address} onClick={() => this.props.handleClick(fav.address)}>{fav.name}</Link>
          )}
      </Section>
    )
  }

}

// onclick action -> send "http://etheroscope.alice.si/api/explore/{address}" to contractviewer
