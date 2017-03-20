import { DatePicker } from 'antd';
import BaseComponent from './BaseComponent/index';
import './BaseComponent/antd-hint';

export default class DatePickerDemo extends BaseComponent {
  constructor() {
    super();

    this.component = DatePicker;
    this.componentName = 'DatePicker';
    this.defaultValue = '<DatePicker />';
  }
}
