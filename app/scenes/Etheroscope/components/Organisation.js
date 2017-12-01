import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding-top: 10px;
  width: 95%;
  margin: auto;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CenteredP = styled.p`
  text-align: center;
`

const OrgName = styled.h1`
  margin-bottom: 0;
`

const OrgUrl = styled.h2`
  margin-top: 0;
`

const ContractsHeading = styled.h3`
  margin-bottom: 0;
`

const NoPointList = styled.ul`
  list-style: none;
  padding: 0;
`

export default function Organisation(props) {
  const org = props.route.organisations.find(org => org.name === props.params.name)
  if (!org) return (<CenteredP>No organisation found with the name "{props.params.name}"</CenteredP>)
  console.log(org)
  return (
    <Wrapper>
      <Page>
        <OrgName>{org.name}</OrgName>
        <OrgUrl><a href={org.url}>{org.url}</a></OrgUrl>
        <p><strong>{org.description}</strong></p>
        <ContractsHeading>Contracts</ContractsHeading>
        <NoPointList>
        {
          org.contracts.map(contract => (<li><a href={'/contracts/' + contract.address}>{contract.address}</a> - {contract.description}</li>))
        }
        </NoPointList>
      </Page>
    </Wrapper>
  )
}
