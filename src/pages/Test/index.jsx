import React, { Component } from 'react'
import {reqCategory} from "../../api"
export default class Test extends Component {
    state={
        count:0
    }
    setZero = ()=>{
        this.setState({count:0})
    }
    click1= ()=>{
        // 函数模式传入 
        //0 0 render 2 2 
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("callback this.state",this.state)}) //2
        console.log("onclick",this.state.count) //0
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("callback this.state",this.state)}) //2
        console.log("onclick",this.state.count) //0
    }
    click2=()=>{
        // 对象模式传入
        //0 0 render 1 1 
        this.setState({count:this.state.count+1},()=>{console.log("callback this.state",this.state)}) //1
        console.log("onclick",this.state.count) //0
        this.setState({count:this.state.count+1},()=>{console.log("callback this.state",this.state)}) //1
        console.log("onclick",this.state.count) //0 
    }
    click3=()=>{
        // 先函数再对象的模式
        // 0 render 1 1 
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("func--callback this.state",this.state)}) //1
        this.setState({count:this.state.count+1},()=>{console.log("obj--callback this.state",this.state)}) //1
        console.log("onclick",this.state.count) //0
    }
    click4=()=>{
        //先对象再函数的模式
        //0 render 2 2
        this.setState({count:this.state.count+1},()=>{console.log("obj--callback this.state",this.state)}) //2
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("func--callback this.state",this.state)}) //2
        console.log("onclick",this.state.count) //0
    }
    click5=async()=>{
        // 异步函数中的模式

        console.log("before await and before setState 1")
        this.setState({ count: this.state.count + 1 }, () => { console.log("obj--callback this.state 5", this.state) }) //1
        console.log("before await and after setState 2")
        // render() 4
        console.log("async before await 3",this.state)  
        await reqCategory(0)
        console.log("async after await 6",this.state) 
        console.log("after await and before setState 7")
        // render() 8
        this.setState({ count: this.state.count + 1 }, () => { console.log("obj--callback this.state 9", this.state) }) //1
        console.log("after await and after setState 10")

    }
    render() {
        console.log("render()")
        return (
            <div>
                <h2>setState()测试</h2>
                <span>两种使用方式，一种是传入对象，一种是传入函数</span><br /> <button onClick={this.setZero}>归零</button>
                <button onClick={this.click1}>函数模式传入</button>
                <button onClick={this.click2}>对象模式传入</button>
                <button onClick={this.click3}>先函数再对象模式传入</button>
                <button onClick={this.click4}>先对象再函数模式传入</button>
                <button onClick={this.click5}>异步函数中设置</button>
            </div>
        )
    }
}
