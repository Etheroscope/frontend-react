import React from 'react'
import styled from 'styled-components'
import {Icon} from 'react-fa'


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column; 
  width: 70%;
`

const AliceImage = styled.img`
  height: 100px;
  margin: 0 auto -10px 100px;
`
  
const Search = styled.div`
  width:100%;
  height:40%;
  position:relative;
`

const SearchBar = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`
const SearchTerm = styled.input `
  width:400px;
  border: 3px solid #00B4CC;
  padding: 5px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  color: black;
`

const SearchButton = styled.button `
  width: 40px;
  height: 36px;
  border: 1px solid #1998a2;
  background: #1998a2;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`
const Navbar = styled.div`
  background-color:#1998a2;
  display: flex;
  flex-direction: row;
  border:1px solid white;
  height: 35%;
`
const Box = styled.div`
  border:1px solid white;
  padding:5px;
  width:33%;
  text-align:center;
  color:white;
`

const Header = ({...props}) => {
  return (
    <Wrapper>
      <AliceImage src='https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png' />
      
      <RightWrapper>
       
       <Search>
        <SearchBar>
            <SearchTerm
                placeholder="Search"
                innerRef={x => { this.input = x }}
                onMouseEnter={() => this.input.focus()}
            />
             <SearchButton>
                <Icon search name="search" />
              </SearchButton>
          </SearchBar>
        </Search>

       <Navbar>
          <Box> Popular </Box>
          <Box> Recent  </Box>
          <Box> Favourites </Box>
        </Navbar>

      </RightWrapper>
    </Wrapper>
  )
}

export default Header
