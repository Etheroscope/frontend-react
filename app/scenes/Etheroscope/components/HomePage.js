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
            this.state = { contracts: [1, 2, 3, 4, 5, 6] }
        }
        
    }

    render() {
        const { contracts } = this.state
        return (
          <Wrapper>
            <ContractGrid>
              {contracts &&
                contracts.map((contract, key) => <ContractCard contract={contract} key={key} />)
              }
            </ContractGrid>
          </Wrapper>
        )
    }
}
