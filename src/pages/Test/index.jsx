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
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("callback this.state",this.state)})
        console.log("onclick",this.state.count)
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("callback this.state",this.state)})
        console.log("onclick",this.state.count)
    }
    click2=()=>{
        this.setState({count:this.state.count+1},()=>{console.log("callback this.state",this.state)})
        console.log("onclick",this.state.count)
        this.setState({count:this.state.count+1},()=>{console.log("callback this.state",this.state)})
        console.log("onclick",this.state.count)
    }
    click3=()=>{
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("func--callback this.state",this.state)})
        this.setState({count:this.state.count+1},()=>{console.log("obj--callback this.state",this.state)})
        console.log("onclick",this.state.count)
    }
    click4=()=>{
        this.setState({count:this.state.count+1},()=>{console.log("obj--callback this.state",this.state)})
        this.setState((state,props)=>({count:state.count+1}),()=>{console.log("func--callback this.state",this.state)})
        console.log("onclick",this.state.count)
    }
    click5=async()=>{
        this.setState({ count: this.state.count + 1 }, () => { console.log("obj--callback this.state", this.state) })
        console.log("async before await",this.state)
        await reqCategory(0)
        console.log("async after await",this.state)
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
