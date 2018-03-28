import React, { PureComponent } from 'react'
import './VariableNode.css'
import NODE_TYPES from './nodeTypes'

export default class VariableNode extends PureComponent {
  static defaultProps = {
    name: '',
    label: '',
    value: '',
  }

  render() {
    return (
      <span
        data-nodetype={NODE_TYPES.variable}
        data-name={this.props.name}
        data-value={this.props.value}
        contentEditable={false}
        className="VariableNode"
      >
        {this.props.label}
      </span>
    )
  }
}