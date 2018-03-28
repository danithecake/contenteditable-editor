import React, { Component } from 'react'
import EditorToolbar from './EditorToolbar'
import EditorDOM from './EditorDOM'
import { EmojiNode, VariableNode, MentionNode, NODE_TYPES } from './Nodes'
import './Editor.css'

export default class Editor extends Component {
  static defaultProps = {
    onInput() {}
  }

  editorRef = null

  insertTypes = {
    [NODE_TYPES.emoji]: code => <EmojiNode code={code} />,
    [NODE_TYPES.variable]: (name, label, value) => (
      <VariableNode name={name} label={label} value={value} />
    ),
    [NODE_TYPES.mention]: name => <MentionNode name={name} />,
  }

  insertNode = (nodeType, ...args) => {
    this.editorRef.focus()

    const node = EditorDOM.render(this.insertTypes[nodeType](...args))
    const range = window.getSelection().getRangeAt(0)
    const spaceAfter = document.createTextNode('\u00A0')

    range.deleteContents()
    range.insertNode(node)
    range.setStartAfter(node)
    range.insertNode(spaceAfter)
    range.collapse(true)
    range.setStartAfter(spaceAfter)

    this.handleInput()
  }

  bindEditorRef = (ref) => {
    this.editorRef = ref;
  }

  domToString = () => {
    this.props.onInput(EditorDOM.domToString(this.editorRef.childNodes, 0))
  }

  handleInputTimeout = null

  handleInput = () => {
    clearTimeout(this.handleInputTimeout)
    this.handleInputTimeout = setTimeout(this.domToString, 500)
  }

  render() {
    return (
      <div className="Editor">
        <div
          ref={this.bindEditorRef}
          className="Editor-input"
          contentEditable
          onInput={this.handleInput}
          suppressContentEditableWarning
        />
        <EditorToolbar onInsertNode={this.insertNode} />
      </div>
    )
  }
}