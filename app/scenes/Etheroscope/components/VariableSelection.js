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
`

const VarSelectedButton = styled.button`
    background-color: white;
    border: 1px solid #4B6575;
    color: #4B6575;
    padding: 5px 50px;
    height: 50px;
    width: 100%;
`

const Separator = styled.hr`
`
const VarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    min-width: 160px;
    height: 60%;
    overflow: auto;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const ChooseVar = styled.span`
    padding: 20px 0px 20px 0px;
`

const FlexDiv = styled.div`
    display: flex;
    margin: 15px 0;
`

class VariableSelection extends React.Component {

  render() {
      const selectedVars = this.props.selectedVariables;

      const Vars = this.props.variables.map((variable) => (
          {variable, selected: selectedVars.includes(variable)}
      ));

      const varMsg = (Vars.length > 0) ? <ChooseVar>Choose a variable:</ChooseVar> : null

    return (
      <Wrapper>
        {varMsg}
        <VarContainer>
          {Vars.map(({ variable, selected }, index) => (
            selected ? (
              <FlexDiv key={index}>
                <VarSelectedButton onClick={() => {
                  this.props.variableClicked(variable)
                }}>
                  {variable}
                </VarSelectedButton>
              </FlexDiv>
            ) : (
              <FlexDiv key={index}>
                <VarButton key={index} onClick={() => {
                  this.props.variableClicked(variable)
                }}>
                  {variable}
                </VarButton>
                {this.props.downloadingVariables[variable] &&
                <FlexDiv>
                  <progress max={100}
                            value={this.props.downloadingVariables[variable].progress * 100}>
                    {this.props.downloadingVariables[variable].progress * 100}%
                  </progress>
                  <button onClick={() => this.props.emailClicked(variable)}>Email</button>
                </FlexDiv>
                }
              </FlexDiv>
            )
          ))}
        </VarContainer>
        <Separator />
      </Wrapper>
    )
  }
}

export default VariableSelection
