import React, { PureComponent } from 'react'
import './VariableNode.css'

export default class VariableNode extends PureComponent {
  static defaultProps = {
    name: '',
    label: '',
    value: '',
  }

  render() {
    return (
      <span
        data-name={this.props.name}
        data-value={this.props.value}
        className="VariableNode"
      >
        {this.props.label}
      </span>
    )
  }
}