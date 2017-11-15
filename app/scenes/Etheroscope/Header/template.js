import React from 'react'
import ReactDom from 'react-dom'
// don't remove above import! needed for FA icons
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const EtheroscopeImage = styled.img`
  height: 100px;
`

const AliceImage = styled.img`
  height: 100px;
  margin-bottom: -10px;
`

const Header = () => {
  return (
    <Wrapper>
      <EtheroscopeImage src="https://avatars3.githubusercontent.com/u/32574990?s=200&v=4" />
      <AliceImage src="https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png" />
    </Wrapper>
  )
}

export default Header
