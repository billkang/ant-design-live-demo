import React from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
import { Row, Col, Button } from 'antd';

// import codemirror
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';

// import mode
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/jsx/jsx';

// import theme
import 'codemirror/theme/xq-light.css';

// placeholder
import 'codemirror/addon/display/placeholder';

// fold
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/foldgutter.css';

// match brackets, tags
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';

// close brackets, tags
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

// trailing space
import 'codemirror/addon/edit/trailingspace';

// mark, high light
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/selection/mark-selection';

// active line
import 'codemirror/addon/selection/active-line';

// hint
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import './antd-hint';

import './index.scss';

export default class BaseComponent extends React.Component {
  constructor() {
    super();

    this.component = null;
    this._refs = {};
    this.editor = null;
    this.defaultValue = null;

    this.updatePreview = this.updatePreview.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this._refs.textarea, {
      // mode
      mode: 'text/html',

      // theme
      theme: 'xq-light',

      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: true,
      styleActiveLine: true,
      lineNumbers: true,

      // match brackets, tags
      matchBrackets: true,
      matchTags: true,

      // close brackets, tags
      autoCloseBrackets: true,
      autoCloseTags: true,

      showTrailingSpace: true,
      styleSelectedText: true,
      // To highlight on scrollbars as well, pass annotateScrollbar in options as below.
      highlightSelectionMatches: {
        showToken: /\w/,
        annotateScrollbar: true
      },

      // fold
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: {
        // fold code when click 'Ctrl-Q'
        'Ctrl-Q': (cm) => { cm.foldCode(cm.getCursor()); },
        // show hit when click 'Space'
        'Alt': 'autocomplete'
      }
    });

    setTimeout(() => {
      this.updatePreview(this.editor.getValue());
    }, 300);
  }

  updatePreview(value) {
    try {
      const result = transform(value, {
        presets: [
          ['es2015', { modules: false }],
          'react'
        ]
      });
      const createElement = new Function('React', `${this.componentName}`, `return ${result.code}`);
      ReactDOM.render.call(this, createElement(React, this.component), this._refs.preview);
    } catch (e) {
      this._refs.preview.innerHTML = `发生错误：${e.message}`;
    }
  }

  reset() {
    this.editor.setValue(this.defaultValue);
    this.updatePreview(this.defaultValue);
  }

  render() {
    return (
      <Row gutter={16}>
        <Col sm={24} lg={12}>
          <textarea
            ref={(elem) => { this._refs.textarea = elem; }}
            defaultValue={this.defaultValue}
            placeholder="coding comes here..."
          />
          <Button onClick={() => { this.updatePreview(this.editor.getValue()); }}>Preview</Button>
          <Button onClick={this.reset}>Reset</Button>
        </Col>
        <Col sm={24} lg={12}>
          <div ref={(elem) => { this._refs.preview = elem; }} />
        </Col>
      </Row>
    );
  }
}
