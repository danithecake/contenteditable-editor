import React, { Component } from 'react'
import EditorToolbar from './EditorToolbar'
import EditorDOM from './EditorDOM'
import { EmojiNode, VariableNode, MentionNode, NODE_TYPES } from './Nodes'
import './Editor.css'

export default class Editor extends Component {
  static defaultProps = {
    onInput() {},
    onSelectionChange() {},
  }

  componentDidMount() {
    document.onselectionchange = this.handleSelectionChange
  }

  componentWillUnmount() {
    document.onselectionchange = null
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

    const node = EditorDOM.render(this.insertTypes[nodeType](...args), nodeType)
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

  nodeNames = {
    [NODE_TYPES.emoji]: 'Emoji',
    [NODE_TYPES.variable]: 'Variable',
    [NODE_TYPES.mention]: 'Mention',
  }

  getSelectionContext = (selection) => {
    const { anchorNode, anchorOffset: position } = selection
    let node = EditorDOM.findContainerNode([anchorNode, anchorNode.parentNode])
    let name = ''
    let content = ''

    if (node != null) {
      const nodeType = parseInt(node.getAttribute('data-nodetype'), 10)

      name = this.nodeNames[nodeType]
      content = EditorDOM.deserializers[nodeType](node)
    } else {
      name = 'Text'
      content = anchorNode.wholeText
    }

    return { node: name, content, position }
  }

  handleInputTimeout = null

  handleInput = () => {
    clearTimeout(this.handleInputTimeout)
    this.handleInputTimeout = setTimeout(this.domToString, 500)
  }

  handleSelectionChange = () => {
    this.props.onSelectionChange(this.getSelectionContext(window.getSelection()))
  }

  handleFocus = (e) => {
    document.onselectionchange = this.handleSelectionChange
  }

  handleBlur = (e) => {
    document.onselectionchange = null

    this.props.onSelectionChange({ node: 'N/A', content: '', position: 'N/A' })
  }

  render() {
    return (
      <div className="Editor">
        <div
          ref={this.bindEditorRef}
          className="Editor-input"
          contentEditable
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          suppressContentEditableWarning
        />
        <EditorToolbar onInsertNode={this.insertNode} />
      </div>
    )
  }
}