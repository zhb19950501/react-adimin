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

// /manage/category/list?parentId=0 根据ID获取分类列表
export const reqCategory =  (parentId)=>{
    return new Promise(
        async (resolve,reject)=>{
            const response = await ajax("/manage/category/list",{parentId})
            if(response.data.status === 0){
                resolve(response.data.data)
            }else{
                message.error("获取表格数据失败")
            }
        }
        
    )


}

// /manage/category/add 添加分类
export const reqAddCategory = (categoryName,parentId)=>{
    return ajax("/manage/category/add",{categoryName,parentId},"POST")
}

// /manage/category/update 更新分类
export const reqUpdateCategory = ({categoryName,categoryId})=>{
    return ajax("/manage/category/update",{categoryName,categoryId},"POST")
}


export const reqProducts=(pageNum,pageSize)=>{
    return ajax("/manage/product/list",{pageNum,pageSize})
}

export const reqSearchProducts=(pageNum,pageSize,productName,productType)=>{
    return ajax("/manage/product/search",{
        pageNum,
        pageSize,
        [productType]:productName
    })
}
export const reqUpdateStatus = (productId,status)=>{
    return ajax("/manage/product/updateStatus",{productId,status},"POST")
}

export const reqProductCategoryName= (categoryId)=>{
    return new Promise(async(resolve,reject)=>{
        const result = await ajax("/manage/category/info",{categoryId})
        console.log(result)
        if(result.statusText==="OK"){
            resolve(result.data.data.name)   
        }else{
            message.error("获取所属分类失败")
        }
    })
} 

export const reqRemovePicture = (name)=>{
    return new Promise(
        async (resolve,reject)=>{
            const result = await ajax("/manage/img/delete",{name},"POST")
            if(result.data.status === 0){
                message.success("删除成功")
                resolve()
            }else{
                message.error(result.data.msg)
            }
        }
    )
    
    
    
}