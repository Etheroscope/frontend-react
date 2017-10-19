import React from 'react'

import './style.scss'

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="favourites-container">
          <span>Favourites: </span>
          {this.props.favourites.map(fav =>
              <a key={fav.address}>{fav.name}</a>
          )}
        </section>
    )
  }
}
