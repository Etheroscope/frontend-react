import React from 'react'
import ReactDom from 'react-dom'
// don't remove above import! needed for FA icons
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const AliceImage = styled.img`
  height: 100px;
  margin: 0 auto -10px auto; /* The -10px is because the image needs cropping */
`

const Header = ({...props}) => {
  return (
    <Wrapper>
      <AliceImage src='https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png' />
    </Wrapper>
  )
}

export default Header
