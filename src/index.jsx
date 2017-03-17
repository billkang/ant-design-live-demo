import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import { DatePicker } from 'antd';
import CodeMirror from 'codemirror/lib/codemirror';

import 'codemirror/lib/codemirror.css';
import 'antd/dist/antd.css';

import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

class App extends React.Component {
  constructor() {
    super();

    this.editor = null;

    this.updatePreview = this.updatePreview.bind(this);
  }

  componentDidMount() {
    // Initialize CodeMirror editor with a nice html5 canvas demo.
    this.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      mode: 'text/html',
      styleActiveLine: true,
      lineNumbers: true,
      lineWrapping: true
    });

    setTimeout(this.updatePreview, 300);
  }

  updatePreview() {
    const result = transform(this.editor.getValue(), {
      presets: [
        ['es2015', { modules: false }],
        'react'
      ]
    });
    const element = result.code;
    const fun = new Function('React', 'DatePicker', `return ${element}`);
    ReactDOM.render.call(this, fun(React, DatePicker), document.getElementById('preview'));
  }

  render() {
    const html = '<DatePicker />';

    return (
      <div>
        <textarea id="code" name="code" defaultValue={html} />
        <button onClick={this.updatePreview}>refresh</button>
        <div id="preview" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
