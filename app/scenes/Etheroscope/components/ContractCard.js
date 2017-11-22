import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: #1998a2;
  border-radius: 4px;
  width: 49.5%;
  height: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  color: white;
`
const Container = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`
const Title = styled.h3`
  text-align: center;
`
const Link = styled.a`
  color: white;
`
const ContractList = styled.ul`
  list-style:none;
`

class ContractCard extends React.Component {

  render() {
    const { name, description, url, contracts } = this.props.organisation
    return (
      <Card>
        <Container>
          <Title>{name}</Title>
          <p>Description: {description}</p>
          <p>Website: <Link href={url}>{url}</Link></p>
          <p>Contracts:</p>
          <ContractList>
            {contracts.map((contract, contractKey) => (
              <Link key={contractKey} href={`/searchresults?${contract}`}><li>{contract}</li></Link>
            ))}
          </ContractList>
        </Container>
      </Card>
    )
  }
}

export default ContractCard