import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import EmailModal from './EmailModal'

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
    
    &::-webkit-progress-bar {
      background-color: #eee;
      border-radius: 2px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    }
    
    &::-webkit-progress-value {
      background-color: #3398c0;
      border-radius: 2px; 
    }
`

const selectedStyle = {
  backgroundColor: '#f9f9f9',
  color: '#4B6575'
}

const downloadingStyle = {
  backgroundColor: '#39464d'
}

class VariableSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = { emailVariable: null, modalOpen: false }
    this.notifyEmailClicked = this.notifyEmailClicked.bind(this)
  }

  render() {
    return (
      <div>
        {<ChooseVar>Choose a variable:</ChooseVar>}
        <VarContainer>
          {Object.entries(this.props.variables)
            .map(([varName, { selected, downloading, progress }], index) => (
              <ButtonContainer key={index}>
                <VarButton style={selected ? selectedStyle : (downloading ? downloadingStyle : {})} onClick={() => {
                  this.props.variableClicked(varName)
                }}>
                  {varName}
                </VarButton>
                {(downloading && progress !== -1) &&
                <Progress max={100} value={progress}>{progress}%</Progress>}
                {(downloading && progress !== -1) &&
                <button onClick={() => this.notifyEmailClicked(varName)}>
                  Email me when complete
                </button>
                }
              </ButtonContainer>
            ))}
        </VarContainer>
        <Separator />
        <EmailModal
          modalOpen={this.state.modalOpen}
          variable={this.state.emailVariable}
          contractAddress={this.props.address}
          closeModal={() => this.setState({ modalOpen: false })}
        />
      </div>
    )
  }

  notifyEmailClicked(emailVariable) {
    this.setState({ modalOpen: true, emailVariable })
  }
}

export default VariableSelection
