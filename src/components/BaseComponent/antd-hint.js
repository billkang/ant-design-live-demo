import CodeMirror from 'codemirror/lib/codemirror';

// Simple tag, reused for a whole lot of tags
const attrs = { attrs: {} };
const bools = [true, false];

const data = {
  // hint for DatePicker Component
  DatePicker: {
    attrs: {
      allowClear: bools,
      style: null,
      popupStyle: null,
      size: null,
      locale: null,
      disabledDate: null,
      getCalendarContainer: null,
      open: null,
      onOpenChange: null,
      placeholder: null
    }
  }
};

const globalAttrs = {
  disabled: null,
  style: null,
  onClick: null,
};

function populate(obj) {
  Object.keys(globalAttrs)
    .forEach((attr) => {
      obj.attrs[attr] = globalAttrs[attr];
    });
}

populate(attrs);
Object.keys(data)
  .forEach((tag) => {
    if (data[tag] !== attrs) {
      populate(data[tag]);
    }
  });

CodeMirror.htmlSchema = data;
function htmlHint(cm, options) {
  const local = { schemaInfo: data };
  if (options) {
    Object.keys(options)
      .forEach((opt) => {
        local[opt] = options[opt];
      });
  }
  return CodeMirror.hint.xml(cm, local);
}

CodeMirror.registerHelper('hint', 'html', htmlHint);
