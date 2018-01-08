import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import {Icon} from 'react-fa'

const VarButton = styled.button`
    justify-content: center;
    background-color: #4B6575;
    color: #f9f9f9;
    min-height: 30px;
    width:100%;
    border: none;
    border: 1px solid #4B6575;
    border-radius: 2px;
`

const VarSelectedButton = styled.button`
    justify-content: center;
    ;
    min-height: 30px;
    width: 100%;
    // padding: 5px 50px;
    // height: 50px;
`

const Separator = styled.hr`
`
const VarContainer = styled.div`
    display: inline-flex;
    align-items: center;
    width: auto;
    min-width: 160px;
    height: 60%;
    overflow: auto;
`

const ChooseVar = styled.span`
    padding: 20px 0px 20px 0px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`

const Progress = styled.progress`
    width: 100%;
    appearance: none;
    margin: 3px 0;
    
    &[value]::-webkit-progress-bar {
      background-color: #eee;
      border-radius: 2px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    }
    
    &[value]::-webkit-progress-value {
      background-color: #3398c0;
      border-radius: 2px; 
    }
`

class VariableSelection extends React.Component {

  render() {
    const selectedVars = this.props.selectedVariables

    const Vars = this.props.variables.map((variable) => (
      { variable, selected: selectedVars.includes(variable) }
    ))

    const selectedStyle = {
      backgroundColor: '#f9f9f9',
      color: '#4B6575'
    }

    return (
      <div>
        {<ChooseVar>Choose a variable:</ChooseVar>}
        <VarContainer>
          {Vars.map(({ variable, selected }, index) => (
            <ButtonContainer key={index}>
              <VarButton style={selected ? selectedStyle : {}} key={index} onClick={() => {
                this.props.variableClicked(variable)
              }}>
                {variable}
              </VarButton>
              {this.props.downloadingVariables[variable] &&
              <Progress max={100}
                        value={this.props.downloadingVariables[variable].progress * 100}>
                {this.props.downloadingVariables[variable].progress * 100}%
              </Progress>}
              {this.props.downloadingVariables[variable] &&
              <button onClick={() => this.props.emailClicked(variable)}>
                Email me when complete
              </button>
              }
            </ButtonContainer>
          ))}
        </VarContainer>
        <Separator />
      </div>
    )
  }
}

export default VariableSelection
