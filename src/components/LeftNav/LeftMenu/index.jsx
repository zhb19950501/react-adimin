import React from 'react'
import { Link } from "react-router-dom"
import { Menu } from 'antd';

// import {
//   AppstoreOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from '@ant-design/icons';

import menuList from "../../../config/menuConfig"
import { div } from 'prelude-ls';
const { SubMenu } = Menu;

export default class LeftMenu extends React.Component {
  
  getNodesFromMenuList(menuList){
    return menuList.map((menuEle) => {
      if (!menuEle.children) {
        return (
          <Menu.Item key={menuEle.key} icon={<menuEle.icon />}>
            <Link to={menuEle.key}>{menuEle.title}</Link>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={menuEle.key} icon={<menuEle.icon />} title={menuEle.title}>
            {this.getNodesFromMenuList(menuEle.children)}
          </SubMenu>
        )
      }

    })
  }

  render() {

    return (
      <div >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"

        >
         
          {this.getNodesFromMenuList(menuList)}
          {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
            <Link to="/home">首页</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category" icon={<AppstoreOutlined />}>
              <Link to="/category">品类管理</Link>
            </Menu.Item>
            <Menu.Item key="/product" icon={<AppstoreOutlined />}>
              <Link to="/product">商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/user" icon={<PieChartOutlined />}>
            <Link to="/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/role" icon={<PieChartOutlined />}>
            <Link to="/role">角色管理</Link>
          </Menu.Item> */}
        </Menu>
      </div>
    );
  }
}

