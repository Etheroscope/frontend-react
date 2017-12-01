import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';

import Etheroscope from './template.js'
import Header from './Header'
import FooterContainer from './Footer'

const Wrapper = styled.div`
  background-color: white;
`

class EtheroscopeContainer extends React.Component {
  constructor(props) {
    super(props)
    const [varName, value] = decodeURI(window.location.search.slice(1)
      .toLowerCase()).split('=')
    this.state = { searchBarQuery: varName === 'query' ? value : '' }
  }

  getChildContext() {
    return { query: this.state.searchBarQuery };
  }

  render() {
    return (
      <Wrapper>
        <Header query={this.state.searchBarQuery}
                queryChanged={query => this.setState({ searchBarQuery: query })}/>
        <Etheroscope {...this.props} />
        <FooterContainer/>
      </Wrapper>
    )
  }
}

EtheroscopeContainer.childContextTypes = {
  query: PropTypes.string
};

export default EtheroscopeContainer