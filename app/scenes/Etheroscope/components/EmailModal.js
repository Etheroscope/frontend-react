import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import {postJson} from '../xhr'

const InputStyle = styled.input`
 width:300px;
 padding: 5px 10px;
 border-radius: 3px;
`
const StyledForm = styled.form`
  text-align: center;
  padding: 10px;
`
const SubmitButton = styled.button`
  border-radius 3px;
  background-color: #4B6575;
  color: #f9f9f9;
  padding: 5px 10px;
  margin-left: 16px;
`

const LoadingContainer = styled.div`
  padding-top: 10px;
`

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    marginRight: '-50%',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '18px 36px 24px 36px'
  }
}

export default class EmailModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      error: false,
      success: false,
      requesting: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        onRequestClose={this.closeModal}
        style={modalStyles}
      >
        <h2> Give us your email address so we can get back to you!</h2>
        <StyledForm onSubmit={this.handleSubmit}>
          <InputStyle
            className={!this.validEmail() ? 'error' : ''}
            type="text"
            placeholder="name@example.com"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <SubmitButton>Subscribe</SubmitButton>
          <br />
          <p className="modal-message">
            {this.state.badEmail && '⚠ Please enter a valid email'}
            {this.state.submitted && '✅ Subscription registered'}
            {this.state.error && '❌ Subscription failed to register'}
          </p>
          {this.state.requesting &&
          <LoadingContainer>
            <div className="lds-rolling">
              <div/>
            </div>
          </LoadingContainer>
          }
        </StyledForm>
      </Modal>)

  }

  closeModal() {
    this.setState({ error: null, success: false, badEmail: false })
    this.props.closeModal();
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value })
  }

  handleSubmit(evt) {
    this.setState({ badEmail: false })
    evt.preventDefault()
    if (!this.validEmail()) {
      this.setState({ badEmail: true })
      return
    }
    this.setState({ requesting: true })
    postJson(`/contracts/${this.props.contractAddress}/history/${this.props.variable}/subscribe/${this.state.email}`)
      .then(result => {
        this.setState({ requesting: false })
        if (result.status === 200) {
          this.setState({ submitted: true })
          setTimeout(this.closeModal, 1000)
        } else {
          this.setState({ error: true })
        }
      })
  }

  validEmail() {
    return validateEmail(this.state.email)
  }

}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
