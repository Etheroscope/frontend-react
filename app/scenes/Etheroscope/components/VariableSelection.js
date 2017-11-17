import React from 'react'
import styled from 'styled-components'

const VarButton = styled.button`
    background-color: #1998a2;
    border: 1px solid white;
    color: white;
    padding: 5px 50px;
`

const VarSelectedButton = styled.button`
    background-color: white;
    border: 1px solid #1998a2;
    color: #1998a2;
    padding: 5px 50px;
`



const Separator = styled.hr`
`

const Wrapper = styled.div`
`

class VariableSelection extends React.Component {


  render() {

      const selectedVars = this.props.selectedVariables;

      const notSelectedVars =
          (selectedVars.length === 0) ? this.props.variables :
              this.props.variables.filter( function(el) {
                  return (!(selectedVars.includes(el)))
              });

    return (
      <Wrapper>
        <Separator />
        <span>Choose a variable:</span>

        {selectedVars.map((variable, index) => (
          <VarSelectedButton key={index} onClick={()=> {this.props.variableClicked(variable)}}>
            {variable}
          </VarSelectedButton>
        ))}

        {notSelectedVars.map((variable, index) => (
          <VarButton key={index} onClick={()=> {this.props.variableClicked(variable)}}>
            {variable}
          </VarButton>
        ))}

        <Separator />
      </Wrapper>
    )
  }
}

export default VariableSelection