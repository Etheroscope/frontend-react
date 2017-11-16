import React from 'react'

const favourites = [
    { name: 'Alice', address: '0xbd897c8885b40d014fb7941b3043b21adcc9ca1c' },
    { name: 'The DAO', address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413' }
];

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

        console.log(this.props);
        return (
          <section style={{ marginBottom: '15px' }}>
            <span>Favourites: </span>
            {favourites.map(fav =>
              <a key={fav.address} style={linkStyle} onClick={() => this.props.handleClick(fav.address)}>{fav.name}</a>
                )}
          </section>
        )
    }

}

