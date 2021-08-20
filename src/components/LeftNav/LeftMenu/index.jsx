import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { Menu } from 'antd';
import localStoreUtils from "../../../utils/localStoreUtils"
import { connect } from "react-redux"
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
import { setHeadTitle } from '../../../redux/action';


const { SubMenu } = Menu;



// const getShowMenuUseReduce = (menuList,showMenuKeys,parentMenu)=>{
//   return menuList.reduce(
//     (pre,cur)=>{
//       if(showMenuKeys.indexOf(cur.key)!==-1){
//        if(parentMenu){
//         parentMenu.children.push(cur)
//         pre.push(parentMenu)
//        } else{
//         pre.push(cur)
//        }
//       }else if(cur.children){
//         let parentMenu = {...cur,children:[]}
//         const result = getShowMenuUseReduce(cur.children,showMenuKeys,parentMenu)[0]
//         pre.push(result)
//       }
//       return pre
//   },[])
// }


// console.log("showmenu",showMenu,showMenuKeys)

class LeftMenu extends React.Component {
  constructor(props) {
    super(props)

    const user = localStoreUtils.getUser()

    const showMenuKeys = user.role.menus

    const getShowMenuUseReduce = (menuList, showMenuKeys, parentMenu) => {
      return menuList.reduce(
        (pre, cur) => {
          if (showMenuKeys.indexOf(cur.key) !== -1) {
            pre.push(cur)
          } else if (cur.children) {
            const childResult = getShowMenuUseReduce(cur.children, showMenuKeys, parentMenu)
            if (childResult.length > 0) {
              cur.children = childResult
              pre.push(cur)
            }
          }
          return pre
        }, [])
    }
    let showMenu = getShowMenuUseReduce(menuList, showMenuKeys)
    //admin 的 showMenu是空的
    if (showMenu.length === 0) {
      showMenu = menuList
    }

    // 初始化得到菜单列表节点数组
    this.menuNodes = this.getNodesFromMenuListUseReduce(showMenu)
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
  getNodesFromMenuListUseReduce = (menuList) => {
    // 获取当前地址
    const path = this.props.location.pathname
    
    
    return menuList.reduce((pre, menuEle) => {
      // 设置标题头部为当前选中状态
      if (menuEle.key === path) {
        console.log("setTitle", this.props.setHeadTitle, menuEle.title)
        this.props.setHeadTitle(menuEle.title)
      }

      // 如果没有子菜单，则直接生成menuItem标签
      if (!menuEle.children) {

        pre.push((
          <Menu.Item key={menuEle.key} icon={<menuEle.icon />}>
            <Link to={menuEle.key} onClick={() => { this.props.setHeadTitle(menuEle.title) }}>{menuEle.title}</Link>
          </Menu.Item>
        ))

      }
      else {
        // 有子菜单，判断是否有需要打开的菜单元素
        // 判断当前路由地址是否为某个父级菜单的子菜单的key，是的话，刷新后默认打开该父级菜单
        // find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
        const openEle = menuEle.children.find((subMenuEle) => {
          // 判断当前地址中是否匹配子菜单的路由地址，如果包含，则需要在刷新时打开父级菜单
          // 如果完全匹配，那么indexOf返回0，不匹配则返回-1
          return path.indexOf(subMenuEle.key) === 0
        })
        if (openEle) {
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
    if (path.indexOf("/product") !== -1) {
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

export default connect(
  (state) => ({ headTitle: state.headTitle }),
  { setHeadTitle: setHeadTitle }
)(withRouter(LeftMenu))