import React from 'react'

import './style.scss'

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
        <form className="address-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.props.address || 'contract address'} onChange={this.handleChange}/>
          <button type="submit">Explore</button>
        </form>
      );
    }
  }

  export default AddressFormContainer