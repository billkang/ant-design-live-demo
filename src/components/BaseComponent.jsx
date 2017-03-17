import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import { Row, Col, Button } from 'antd';
import CodeMirror from 'codemirror/lib/codemirror';

export default class BaseComponent extends React.Component {
  constructor() {
    super();

    this.component = null;
    this._refs = {};
    this.editor = null;
    this.defaultValue = null;

    this.updatePreview = this.updatePreview.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this._refs.textarea, {
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
    const fun = new Function('React', `${this.componentName}`, `return ${element}`);
    ReactDOM.render.call(this, fun(React, this.component), this._refs.preview);
  }

  render() {
    return (
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <textarea
            ref={(elem) => { this._refs.textarea = elem; }}
            defaultValue={this.defaultValue}
          />
          <Button onClick={this.updatePreview}>Preview</Button>
        </Col>
        <Col sm={24} lg={12}>
          <div ref={(elem) => { this._refs.preview = elem; }} />
        </Col>
      </Row>
    );
  }
}
