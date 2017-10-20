import React from 'react'

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const linkStyle = {
      color: 'white',
      marginRight: '10px',
      borderBottom: 'white 1px solid',
      textDecoration: 'none',
      cursor: 'pointer'
    };

    return (
      <section style={{ marginBottom: '15px' }}>
        <span>Favourites: </span>
        {this.props.favourites.map(fav =>
          <a key={fav.address} style={linkStyle} onClick={() => this.props.handleClick(fav.address)}>{fav.name}</a>
          )}
      </section>
    )
  }

}

// onclick action -> send "http://etheroscope.alice.si/api/explore/{address}" to contractviewer
