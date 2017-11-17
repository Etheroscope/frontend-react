import React from 'react';
import styled from 'styled-components'
import fetchJson from './../xhr'

import ContractCard from './ContractCard.js'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const ContractGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  padding-top: 10px;
  width: 95%;
  margin: auto;
`

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)

        const organisations = [{
            name: "Alice",
            description:
            "Alice is a platform that brings transparency to social funding through blockchain technology.",
            url: "http://alice.si",
            contracts: [
                "0x972a2dA1f9d1dc0B01D313e52fFe916bB5E9a2c1",
                "0xBd897c8885b40d014Fb7941B3043B21adcC9ca1C"
            ]
        },
        {
            name: "The DAO",
            description:
            "The DAO was a digital decentralized autonomous organization and a form of investor-directed venture capital fund.",
            url: "https://daohub.org/",
            contracts: [
                "0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
            ]
        }]

        if (props.category) {
            switch (props.category) {
                case 'favourites':
                    // this.state = { contracts: fetch favourites }
                    break
                case 'recent':
                    // this.state = { contracts: fetch recent }
                    break
                case 'popular':
                default:
                    // this.state = { contracts: fetch popular }
                    break
            }
        } else {
            this.state = { organisations: organisations }
        }
        
    }

    render() {
        const { organisations } = this.state
        return (
          <Wrapper>
            <ContractGrid>
              {organisations &&
                organisations.map((organisation, key) => <ContractCard organisation={organisation} key={key} />)
              }
            </ContractGrid>
          </Wrapper>
        )
    }
}
