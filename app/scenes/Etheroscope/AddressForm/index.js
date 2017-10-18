import React from 'react'

import AddressForm from './template.js'

class AddressFormContainer extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      // Propagate up
    }
  
    handleSubmit(event) {
      alert('An address was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <AddressForm 
        address={this.props.address || 'contract address'}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
      )
    }
  }

  export default AddressFormContainer