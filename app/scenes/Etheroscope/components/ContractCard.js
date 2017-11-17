import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: gray;
  border-radius: 4px;
  width: 33%;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const Container = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`

class ContractCard extends React.Component {

  render() {
    const { contract } = this.props
    return (
      <Card>
        <Container>
          <p>Contract {contract}</p>
        </Container>
      </Card>
    )
  }
}

export default ContractCard