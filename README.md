## CSS
    1.background-image:url() 引入的背景图片是无法撑开元素高度的样子，
        需要把引入该背景的每一个父元素的高度都设为100%才可以实现背景图片全屏展示


## 线上服务器
    http://zlx.cool:5000
    http://159.75.128.32:5000
    http://120.55.193.14:5000
## JS
    1.async 和 await 简化代码，去除promise.then().catch()里的回调模式
        await 写在要等待的promise对象的左边 const result = await promise
        async 写在await最近的外层函数的定义的左边   const fun = async ()=>{}
    2.统一处理错误
        使用async和await虽然可以将回调转换为同步代码的模式，但是处理错误要使用try{……}catch(err){……}模式
            这样每一个接口的调用时都要使用很繁琐，为了统一处理错误，将处理的代码转移到ajax模块里，令其内部处理完错误后再返回结果，避免外部重复处理错误
        
        在ajax模块里，通过返回一个新的promise对象，在其中处理发送的异步请求，出现了问题时，在catch里不调用新创建的promise对象的reject方法，这样就不会把错误传递出去


## React
    1.this.props.location.pathname 获取路由组件的地址
    2.this.props.location.state 获取跳转过程传递的对象
    3.const [state,dispacth()] = useReducer(loginReducer,initState)
      const loginReducer = (state,action)=>{
          switch(action.type){
              case "login"
              return {...state,login:true}
          }
      }

      dispatch({type:login})


## antd
    form 表单初始值旨在每次表格渲染的时候会套用，要实时更改，应该使用form.setFieldsValue({FormItemName:newValue})
        该方法传入的配置对象，键为form表单的name属性值，name在antd的组件里相当于它的Id