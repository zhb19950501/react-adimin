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
    // 获取当前地址
    const path = this.props.location.pathname

    return menuList.reduce((pre, menuEle) => {
      // 如果没有子菜单，则直接生成menuItem标签
      if (!menuEle.children) {
        pre.push((
          <Menu.Item key={menuEle.key} icon={<menuEle.icon />}>
            <Link to={menuEle.key}>{menuEle.title}</Link>
          </Menu.Item>
        ))}
      else{
        // 判断当前路由地址是否为某个父级菜单的子菜单的key，是的话，刷新后默认打开该父级菜单
        const openEle = menuEle.children.find((subMenuEle)=>{
            // 判断当前地址中是否包含子菜单的路由地址，如果包含，则需要在刷新时打开父级菜单
            // 如果包含，那么indexOf返回0，不包含则返回-1
            return path.indexOf(subMenuEle.key) === 0
        })
        if(openEle){
          this.openKeys = menuEle.key
        }
        // 
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
    let path = this.props.location.pathname
    if (path.indexOf("/product")!== -1){
      path = "/product"
    }
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