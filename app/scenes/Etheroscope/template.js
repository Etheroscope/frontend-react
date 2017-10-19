import React from 'react'
import styled from 'styled-components'

import AddressFormContainer from './AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'
import VariableSelection from './VariableSelection.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Banner = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 50px;
`

const Page = styled.div`
  display: flex;
  align-self: center;
  width: 90%;
`

class Etheroscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contract: {} };
  }

  render() {
    return (
      <Wrapper>
        <Banner style={{ fontSize: '20px', color: 'white' }}>
          <div style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <AddressFormContainer address={this.state.contract.address}/>
            <Favourites favourites={this.props.favourites}/>
          </div>
        </Banner>
        <Page>
          <VariableSelection variables={[{name: 'hello'}, {name: 'yo'}]}/>
          <ContractViewer/>
        </Page>
      </Wrapper>
    )
  }
}

export default Etheroscope
