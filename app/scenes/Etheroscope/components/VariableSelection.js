import React from 'react'
import styled from 'styled-components'

const VarButton = styled.button`
    justify-content: center;
    background-color: #1998a2;
    border: 1px solid white;
    color: white;
    min-height: 30px;
    width:100%;
`

const VarSelectedButton = styled.button`
    background-color: white;
    border: 1px solid #1998a2;
    color: #1998a2;
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
    overflow: scroll;
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

class VariableSelection extends React.Component {

  render() {
      const selectedVars = this.props.selectedVariables;

      const Vars = this.props.variables.map((variable) => (
          {variable, selected: selectedVars.includes(variable)}
      ));

      const varMsg = (Vars.length > 0) ? <ChooseVar>Choose a variable:</ChooseVar> : null

      console.log(selectedVars)

    return (
      <Wrapper>
        {varMsg}
        <VarContainer>
          {Vars.map(({variable, selected}, index) => (
            selected ?
                (<VarSelectedButton key={index} onClick={() => { this.props.variableClicked(variable) }}>
                  {variable}
                </VarSelectedButton>)
            :
                (<VarButton key={index} onClick={() => { this.props.variableClicked(variable) }}>
                  {variable}
                </VarButton>)
                )
          )}
        </VarContainer>
        <Separator />
      </Wrapper>
    )
  }
}

export default VariableSelection