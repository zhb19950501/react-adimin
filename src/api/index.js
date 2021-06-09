/*
    包含应用中所有接口请求函数的模块
    每个接口请求函数的返回值都是promise
*/
import ajax from "./ajax"
import jsonp from "jsonp"
import {
    GAODEKEY
} from "../config/constConfig"
import { message } from "antd"
// 登录
// export function reqLogin(username,password){
//     return ajax("/login",{username,password},"POST")
// }

export const reqLogin = (username, password) => ajax("/login", {
    username,
    password
}, "POST")

export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST")


export const reqWeather = () => {
    const reqCityAdcode = ()=>{
        const URL = `https://restapi.amap.com/v3/ip?key=${GAODEKEY}`
        return new Promise((resolve,reject)=>{
            jsonp(URL,{},(err,data)=>{
                if(!err&&data.status==="1"){
                    const cityAdcode = data.adcode
                    resolve(cityAdcode)
                }else{
                    message.error("获取城市失败")
                }
            })
        })
            
    }
    return new Promise(async(resolve,reject) => {
        const cityAdcode = await reqCityAdcode()
        const URL = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityAdcode}&key=${GAODEKEY}`
        jsonp(URL, {}, (err, data) => {
            if(!err&&data.status==="1"){
                const {province,weather} = data.lives[0]
                resolve({province,weather})
            }else{
                message.error("获取天气失败")
            }
        })

    })

}


