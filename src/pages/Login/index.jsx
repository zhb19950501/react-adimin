// 登录的路由组件
import React, { Component } from 'react'

import {NormalLoginForm} from "./UserForm"
import "./login.less"
import logo from "./images/login-logo.png"

export default class Login extends Component {
    render() {
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
