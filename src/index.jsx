import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'antd/dist/antd.css';

import HomePage from './components/HomePage';
import DatePickerDemo from './components/DatePickerDemo';

import './index.scss';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
      mode: 'inline',
    };

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse(collapsed) {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <h1 className="title">Live Demo</h1>
            <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span className="nav-text">Data Entry</span></span>}
              >
                <Menu.Item key="1">
                  <Link to="/DatePicker">DatePicker</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Route exact path="/" component={HomePage} />
              <Route path="/datepicker" component={DatePickerDemo} />
            </Content>
            <Footer>
              Ant Design Live Demo ©2017 Created by bill kang.
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
