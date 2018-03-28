import React, { PureComponent } from 'react'
import './MentionNode.css'

export default class MentionNode extends PureComponent {
  static defaultProps = {
    name: '',
  }

  render() {
    return <span className="MentionNode">@{this.props.name}</span>
  }
}