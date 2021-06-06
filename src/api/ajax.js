// 封装axios库，函数返回值是promise对象
import { message } from "antd"
import axios from "axios"
const ajax = (url,data={},type="GET")=>{

    return new Promise((resolve,reject)=>{
        let promise
        if(type ==="GET"){
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(err=>{
            message.error("请求出错"+err.message)
        })
    })
}
export default  ajax
