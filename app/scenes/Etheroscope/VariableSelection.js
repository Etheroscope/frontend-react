import React from 'react'
import styled from 'styled-components'

const VarButton = styled.button`
    background-color: #1998a2;
    border: 1px solid white;
    color: white;
    padding: 5px 50px;
`

const Separator = styled.hr`
`

const Wrapper = styled.div`
`

class VariableSelection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Wrapper>
            <Separator/>
            <span>Choose a variable:</span>
            {this.props.variables.map((variable, index) => (
                <VarButton key={index} onClick={()=> {this.props.variableClicked(variable.name)}}>
                    {variable.name}
                </VarButton>
                ))
            }
            <Separator/>
        </Wrapper>
    )
  }
}

export default VariableSelection