import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const Work = styled.a`
  color: black;
  margin-left: 50px;
  width: 40%;
`

const AliceImage = styled.img`
  display: flex;
  height: 100px;
  width: 250px;
`

const Header = ({...props}) => {
  return (
    <Wrapper>
        <Work href='#'>How it Works</Work>
      <AliceImage src='https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png' />
    </Wrapper>
  )
}

export default Header
