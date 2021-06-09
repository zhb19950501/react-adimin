import React from 'react'
import { Link,withRouter} from "react-router-dom"
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
const { SubMenu } = Menu;

class LeftMenu extends React.Component {
  constructor(props){
    super(props)
    // 初始化得到菜单列表节点数组
    this.menuNodes = this.getNodesFromMenuListUseReduce(menuList)
  }

  // getNodesFromMenuList(menuList) {
  //   return menuList.map((menuEle) => {
  //     if (!menuEle.children) {
  //       return (
  //         <Menu.Item key={menuEle.key} icon={<menuEle.icon />}>
  //           <Link to={menuEle.key}>{menuEle.title}</Link>
  //         </Menu.Item>
  //       )
  //     } else {
  //       return (
  //         <SubMenu key={menuEle.key} icon={<menuEle.icon />} title={menuEle.title}>
  //           {this.getNodesFromMenuList(menuEle.children)}
  //         </SubMenu>
  //       )
  //     }

  //   })
  // }

  // 使用reduce实现上面map的功能
  getNodesFromMenuListUseReduce=(menuList)=> {
    const path = this.props.location.pathname

    return menuList.reduce((pre, menuEle) => {
      if (!menuEle.children) {
        pre.push((
          <Menu.Item key={menuEle.key} icon={<menuEle.icon />}>
            <Link to={menuEle.key}>{menuEle.title}</Link>
          </Menu.Item>
        ))}
      else{
        const openEle = menuEle.children.find((subMenuEle)=>{
            return subMenuEle.key === path
        })
        if(openEle){
          this.openKeys = menuEle.key
        }
        pre.push((
          <SubMenu key={menuEle.key} icon={<menuEle.icon />} title={menuEle.title}>
            {this.getNodesFromMenuListUseReduce(menuEle.children)}
          </SubMenu>
        ))
        }
      return pre
    }, [])
  }

  render() {
    const path = this.props.location.pathname
    return (
      
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKeys]}
          mode="inline"
          theme="dark"

        >

          {this.menuNodes}
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
      
    );
  }
}

export default withRouter(LeftMenu)