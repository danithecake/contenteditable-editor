import React, { Component } from 'react';
import './App.css';
import Editor from './components/Editor/Editor'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { editorContent: '' }
  }

  handleInput = (editorContent) => {
    this.setState({ editorContent })
  }

  render() {
    return (
      <div className="App">
        <div className="App-col">
          <h3>Editor</h3>
          <Editor onInput={this.handleInput}/>
        </div>
        <div className="App-col">
          <h3>Preview</h3>
          <div className="Editor-preview">{this.state.editorContent}</div>
        </div>
      </div>
    );
  }
}

export default App;
