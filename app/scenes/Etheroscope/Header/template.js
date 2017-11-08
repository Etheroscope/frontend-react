import React from 'react'
import styled from 'styled-components'
import {Icon} from 'react-fa'


const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  // align-items: center;
  width: 100%;
`

const AliceImage = styled.img`
  height: 150px;
  position: sticky;
  left: 10px; 
  // margin: 0 auto -10px auto; /* The -10px is because the image needs cropping */
`

const SearchBar = styled.div`
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const SearchButton = styled.button `
  position: absolute;  
  right: -50px;
  width: 40px;
  height: 36px;
  border: 1px solid #00B4CC;
  background: #00B4CC;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
`

const SearchItems = styled.h3`
  color: black;
`

const Search = styled.div`
  width: 100%;
  position: relative
`

const SearchTerm = styled.input `
  float: left;
  width: 100%;
  border: 3px solid #00B4CC;
  padding: 5px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  color: #9DBFAF;
`



// .searchTerm:focus{
//     color: #00B4CC;
// }


const Header = ({...props}) => {
  return (
    <Wrapper>
      <AliceImage src='https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png' />
      <SearchBar>
        <Search>
            <SearchTerm
                placeholder="Search everything here"
                innerRef={x => { this.input = x }}
                onMouseEnter={() => this.input.focus()}
            />
            <SearchButton>
                <Icon search name="search" />
            </SearchButton>
        </Search>
      </SearchBar>
    </Wrapper>
  )
}

export default Header
