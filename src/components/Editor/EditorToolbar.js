import React, { PureComponent } from 'react'
import { NODE_TYPES } from './Nodes'
import './EditorToolbar.css'

export default class EditorToolbar extends PureComponent {
  static defaultProps = {
    onInsertNode() {},
  }

  insertHandlers = {
    [NODE_TYPES.emoji]: () => {
      this.props.onInsertNode(NODE_TYPES.emoji, '😀')
    },
    [NODE_TYPES.variable]: () => {
      this.props.onInsertNode(NODE_TYPES.variable, 'full_name', 'Full name', 'Darth Vader')
    },
    [NODE_TYPES.mention]: () => {
      this.props.onInsertNode(NODE_TYPES.mention, 'darth_vader')
    },
  }

  render() {
    return (
      <div className="EditorToolbar">
        <button className="EditorToolbar-button" onClick={this.insertHandlers[NODE_TYPES.emoji]}>
          :)
        </button>
        <button className="EditorToolbar-button" onClick={this.insertHandlers[NODE_TYPES.variable]}>
          ν
        </button>
        <button className="EditorToolbar-button" onClick={this.insertHandlers[NODE_TYPES.mention]}>
          @
        </button>
      </div>
    )
  }
}