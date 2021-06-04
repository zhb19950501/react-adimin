//  local 数据存储管理的工具模块
// localStorage对于低版浏览器兼容性可能不太好，可以使用第三方库store,这个库可以自动转换成json
import store from "store"

const USER_KEY = "user_key"
const localStoreUtils = {
    // 保存user
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    // 读取user
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY)||"{}") 
        return store.get(USER_KEY) || {}
    },
    // 删除user
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        return store.remove(USER_KEY)
    }

}
export default localStoreUtils