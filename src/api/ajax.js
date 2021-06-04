<<<<<<< HEAD
import { message } from "antd"
import axios from "axios"
export default function ajax(url,data={},type="GET"){
    return new Promise((resolve)=>{
        let promise
        if(type === "GET"){
=======
// 封装axios库，函数返回值是promise对象
import { message } from "antd"
import axios from "axios"
const ajax = (url,data={},type="GET")=>{

    return new Promise((resolve,reject)=>{
        let promise
        if(type ==="GET"){
>>>>>>> a5611b0b3c12e54da6952f53726bda26f28ec463
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
<<<<<<< HEAD
        promise.then(
            response=>resolve(response.data)
        ).catch(
            err=>message.error("请求失败"+err.message)
        )
    })
}
=======
        promise.then(response=>{
            resolve(response)
        }).catch(err=>{
            message.error("请求出错"+err.message)
        })
    })
}
export default  ajax
>>>>>>> a5611b0b3c12e54da6952f53726bda26f28ec463
