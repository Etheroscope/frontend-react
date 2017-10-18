import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: white
  display: flex;
  justify-content: stretch;
`

const Work = styled.li`
  color: black;
`

const AliceImage = styled.img`
  display: flex;
  align-self: center;
  height: 30px;
  width: 50px;
`

const Header = ({...props}) => {
  return (
    <Wrapper>
      <ul>
        <Work><a href=''>How it Works</a></Work>
      </ul>
      <AliceImage src='https://s3.eu-west-2.amazonaws.com/alice-res/Logotype_right.png' />
    </Wrapper>
  )
}

export default Header
