<<<<<<< HEAD
import ajax from "./ajax"

export const reqLoading = data => ajax("/login", data, "POST")

=======
/*
    包含应用中所有接口请求函数的模块
    每个接口请求函数的返回值都是promise
*/ 
import ajax from "./ajax"
// 登录
// export function reqLogin(username,password){
//     return ajax("/login",{username,password},"POST")
// }

export const reqLogin =(username,password)=> ajax("/login",{username,password},"POST")

export const reqAddUser = (user) => ajax("/manage/user/add",user,"POST")
>>>>>>> a5611b0b3c12e54da6952f53726bda26f28ec463
