import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ReduxForm from 'redux-form'

import * as Actions from '../../../actions'
import AddressForm from './template.js'

class AddressFormContainer extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleSubmit(event) {
      event.preventDefault()
      console.log(`Form address is ${this.props.formAddress}`)
      this.props.actions.requestAddress(this.props.formAddress)
      alert('An address was submitted: ' + this.props.formAddress)
    }
  
    render() {
      return (
        <AddressForm 
        address={this.props.address || 'contract address'}
        handleSubmit={this.handleSubmit} />
      )
    }
}

const mapStateToProps = (state) => ({
    formAddress: ReduxForm.formValueSelector('addressForm')(state, 'address') 
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressFormContainer)