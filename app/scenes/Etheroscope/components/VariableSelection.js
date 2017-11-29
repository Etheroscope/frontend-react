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
  constructor(props) {
    super(props);
  }

  render() {
      const selectedVars = this.props.selectedVariables;

      const Vars = this.props.variables.map((variable) => (
          {variable, selected: selectedVars.includes(variable)}
      ));

      const varMsg = (Vars.length > 0) ? <span>Choose a variable:</span> : null

      console.log(selectedVars)

    return (
      <Wrapper>
        {varMsg}
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
        <Separator />
      </Wrapper>
    )
  }
}

export default VariableSelection