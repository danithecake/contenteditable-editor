import React, { PureComponent } from 'react'
import './MentionNode.css'
import NODE_TYPES from './nodeTypes'

export default class MentionNode extends PureComponent {
  static defaultProps = {
    name: '',
  }

  render() {
    return (
      <span
        data-nodetype={NODE_TYPES.mention}
        contentEditable={false}
        className="MentionNode"
      >
        @{this.props.name}
      </span>
    )
  }
}