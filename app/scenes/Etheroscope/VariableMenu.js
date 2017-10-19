import React from 'react'

export default class VariableMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section style={{ marginBottom: '15px' }}>
          <span>Choose a variable: </span>
          {this.props.variables.map((variable, index) =>
              <button key={index}>{variable.name}</button>
          )}
        </section>
    )
  }
}

