import React from 'react'
import {Link} from "react-router-dom"
import { Menu } from 'antd';

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class LeftMenu extends React.Component {

  render() {
    return (
      <div >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          
        >
            <Link></Link>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            首页
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="5" icon={<AppstoreOutlined/>}>品类管理</Menu.Item>
            <Menu.Item key="6" icon={<AppstoreOutlined/>}>商品管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<PieChartOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="8" icon={<PieChartOutlined />}>
            角色管理
          </Menu.Item>
          <Menu.Item key="9" icon={<PieChartOutlined />}>
            图表
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

