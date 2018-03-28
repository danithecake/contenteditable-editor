import React, { PureComponent } from 'react'
import './EmojiNode.css'
import NODE_TYPES from './nodeTypes'

export default class EmojiNode extends PureComponent {
  static defaultProps = {
    code: '😀'
  }

  render() {
    return (
      <img
        alt={this.props.code}
        data-nodetype={NODE_TYPES.emoji}
        src="https://www.emojicool.com/assets/img/emoji/1f600.png"
        className="EmojiNode"
      />
    )
  }
}