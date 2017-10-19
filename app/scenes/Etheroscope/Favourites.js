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
    }

    const getData = function (address) {
      var xmlHttp = new XMLHttpRequest()
      const url = 'http://etheroscope.alice.si/api/explore/' + address
      xmlHttp.open( "GET", url, false ) // false for synchronous request
      xmlHttp.send( null )
      return xmlHttp.responseText
    }

    return (
        <section style={{ marginBottom: '15px' }}>
          <span>Favourites: </span>
          {this.props.favourites.map(fav =>
              <a key={fav.address} style={linkStyle} onClick={() => getData(fav.address)}>{fav.name}</a>
          )}
        </section>
    )
  }
}
