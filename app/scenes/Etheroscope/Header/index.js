import React from 'react'
import ReactDom from 'react-dom'
// don't remove above import! needed for FA icons
import styled from 'styled-components'
import {Icon} from 'react-fa'


const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  background: #4B6575;
  position: fixed;
  z-index: 20;
  border-bottom: 5px solid #f9f9f9; 
`
const InnerWrapper = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  width: 95%;
`

const EtheroscopeImageWrapper = styled.div`
  display: inline-flex;
  position: relative;
  flex-direction: left;
  min-width: 205px;
  width: 22%;
  margin-right: 5px;
  justify-content: left;
`

const Search = styled.div`
  width: 100%;
  height: 40%;
  position: relative;
  flex-direction: right;
  display: inline-flex;
  margin-left: 5px;
`

const EtheroscopeImage = styled.img`
  height: 60px;
  padding: 10px 0;
`


const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  top: 20px;
  right: 0px;
  width: 100%;
`
const SearchTerm = styled.input `
  width: 100%;
  border: 3px solid #3398c0;
  padding: 5px;
  height: 20px;
  border-radius: 3px;
  outline: none;
  color: black;
`

const SearchButton = styled.button `
  margin-left: 5px;
  width: 40px;
  height: 36px;
  border: 0px solid #3398c0;
  background: #3398c0;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #33aacc;
  }
`

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  submitSearch() {
    const query = this.props.query
    const regex = new RegExp("0x[a-fA-F0-9]{40}")
    const isAddress = regex.test(query)
    window.location = (isAddress) ? `/contracts/${query}`
      : `/search?query=${query}`
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') this.submitSearch()
  }

  render() {
    return (
      <Wrapper>
        <InnerWrapper>
          <EtheroscopeImageWrapper>
            <a href="/"><EtheroscopeImage src="/static/etheroscope-white.png"/></a>
          </EtheroscopeImageWrapper>
          <Search>
            <SearchBar>
              <SearchTerm
                onKeyPress={this.handleKeyPress}
                id="search"
                placeholder='Search for a smart contract'
                value={this.props.query}
                onChange={e => this.props.queryChanged(e.target.value)}
                innerRef={x => this.input = x}
                onMouseEnter={() => this.input.focus()}
              />
              <SearchButton onClick={this.submitSearch} onKeyPress={this.handleKeyPress}>
                <Icon name="search"/>
              </SearchButton>
            </SearchBar>
          </Search>
        </InnerWrapper>
      </Wrapper>
    )
  }
}
