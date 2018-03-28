import React, { PureComponent } from 'react'
import './EmojiNode.css'

export default class EmojiNode extends PureComponent {
  static defaultProps = {
    code: '😀'
  }

  render() {
    return (
      <img
        alt={this.props.code}
        src="https://www.emojicool.com/assets/img/emoji/1f600.png"
        className="EmojiNode"
      />
    )
  }
}