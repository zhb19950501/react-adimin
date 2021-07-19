// 后台管理的路由组件
import React, { Component } from 'react'
import {Redirect,Switch,Route} from "react-router-dom"
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'
import Category from "../Category"
import Home from "../Home"
import Product from "../Product"
import Role from "../Role"
import User from "../User"
import Bar from "../Charts/Bar"
import Line from "../Charts/Line"
import Pie from "../Charts/Pie"

export default class Admin extends Component {
    render() {
        const {Footer, Sider, Content } = Layout;
        const user = memoryUtils.user
        if(!user || !user._id){
            return <Redirect to="/login"></Redirect>
        }
        return (
                <Layout style={{minHeight:"100%"}}>
                    <Sider><LeftNav/></Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{margin:20,backgroundColor:"#fff"}}>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/category" component={Category}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Redirect to="/home"/>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:'center',color:"#ccc"}}>推荐使用谷歌浏览器，获得最佳体验</Footer>
                    </Layout>
                </Layout>
            
        )
    }
}
