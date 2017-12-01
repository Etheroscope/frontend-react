import React from 'react'
import styled from 'styled-components'
import fetchJson from './../xhr'

import AddressFormContainer from './../AddressForm'
import ContractViewer from './ContractViewer.js'
import Favourites from './Favourites.js'
import Modal from 'react-modal'
import Delay from 'react-delay'

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BannerContainer = styled.div`
  width: 100%;
  background-color: rgb(25, 152, 162);
  padding-top: 10px;
  fontSize: 20px;
  color: white;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const Banner = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const Page = styled.div`
  width: 90%;
  margin: auto;
`
const ButtonStyle = styled.button`
  padding: 10px;
  width:200px;
  background-color: rgb(25, 152, 162);
  border-radius 5px;
  color: white;
  display: block;
  margin: 50px auto;
`
const InputStyle = styled.input`
 width:300px;
`
const Formstyle=styled.form`
  margin-left:100px;
  padding: 10px;
`
const SubmitButton=styled.button`
  border-radius 5px;
  background-color: rgb(25, 152, 162);
  color: white;
  margin-left:20px;
`
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Explorer extends React.Component {
  constructor(props) {
    super(props)
    const address = document.location.hash.slice(1);
    this.state = {
      contract: { nullContract: true, variables: [], abi: [] },
      contractAddress: 'contract address',
      modalIsOpen: false,
      email: '',
      everFocusedEmail: false,
      inFocus: '',
    }
    
    if (address) this.changeContract(address);
    this.changeContract = this.changeContract.bind(this)
    this.addressChanged = this.addressChanged.bind(this)
    this.exploreClicked = this.exploreClicked.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  downloadContract(address) {
    const url = `/contracts/${address}`
    return fetchJson(url)
  }

  changeContract(address) {
    return this.downloadContract(address)
        .then(contract => this.setState({
            contract,
            contractAddress: address
        }))
        .catch(err => {
            console.log(err);
            this.setState({
                contract: {}
                // contractAddress: ""
            });
        })
  }

  exploreClicked() {
    this.changeContract(this.state.contractAddress)
  }

  addressChanged(newAddress) {
    this.setState({ contractAddress: newAddress })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.changeContract(this.state.contractAddress)
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  validEmail() {
    return validate(this.state.email);
  }

  handleSubmit(evt) {
    if (!this.validEmail()) {
      evt.preventDefault();
      return;
    }
    const { email } = this.state;
    alert(`Signed up with email: ${email}`);
  }

  render() {
    return (
      <Wrapper>
        <BannerContainer>
          <Banner>
            <AddressFormContainer
              address={this.state.contractAddress}
              handleChange={this.addressChanged}
              handleClick={this.exploreClicked}
              handleKeyPress={this.handleKeyPress}
            />
            <Favourites handleClick={this.changeContract} />
          </Banner>
        </BannerContainer>
        <Page>
          <ContractViewer contract={this.state.contract} />
          <Delay wait={1200}>
            <div>
              <ButtonStyle onClick={this.openModal}>Taking too long? </ButtonStyle>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
              >
                <h2 > Give us your email address so we can get back to you!</h2>
                <Formstyle onSubmit={this.handleSubmit}>
                  <InputStyle
                    className={this.validEmail() ? "error" : ""}
                    type="text"
                    placeholder="name@example.com"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                  <SubmitButton disabled={!this.validEmail()}>Submit</SubmitButton>
                </Formstyle>         
              </Modal>
            </div>
          </Delay>
        </Page>
      </Wrapper>
    )
  }
}

function validate(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
