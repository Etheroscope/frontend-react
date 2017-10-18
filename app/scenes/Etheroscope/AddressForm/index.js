import React from 'react'

import AddressForm from './template.js'

class AddressFormContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''}
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('An address was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <AddressForm 
        value={this.state.value}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
      )
    }
  }

  export default AddressFormContainer