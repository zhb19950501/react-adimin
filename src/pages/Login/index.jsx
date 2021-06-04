// 登录的路由组件
import React, { Component } from 'react'

import {NormalLoginForm} from "./UserForm"
import "./login.less"
import logo from "../../assets/images/login-logo.png"
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router'


export default class Login extends Component {
    render() {
        // 判断用户是否登录，如果已经登录(内存或者本地user有值)则自动跳转到admin界面
        if(memoryUtils.user && memoryUtils.user._id){
            return <Redirect to="/"/>
        }
        return (
            <div className="login"> 
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <NormalLoginForm/>
                </section>
            </div>
        )
    }
}
