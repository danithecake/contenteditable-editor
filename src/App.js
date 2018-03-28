import React, { Component } from 'react';
import './App.css';
import Editor from './components/Editor/Editor'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorContent: '',
      selectionContext: {
        node: 'N/A',
        content: '',
        position: 'N/A'
      },
    }
  }

  handleSelectionChange = (selectionContext) => {
    this.setState({ selectionContext })
  }

  handleInput = (editorContent) => {
    this.setState({ editorContent })
  }

  render() {
    const { editorContent, selectionContext } = this.state

    return (
      <div className="App">
        <div className="App-col">
          <h3>Editor</h3>
          <Editor onInput={this.handleInput} onSelectionChange={this.handleSelectionChange} />
        </div>
        <div className="App-col">
          <h3>Preview</h3>
          <div className="Editor-preview">{editorContent}</div>
          <div className="Editor-selection-context">
            <h3>Selection context</h3>
            <p>
              <b>Node:</b>&nbsp;
              <i>{selectionContext.node}</i>&nbsp;&nbsp;
              <b>Cursor position:</b>&nbsp;
              <i>{selectionContext.position}</i>
            </p>
            <p>{selectionContext.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
