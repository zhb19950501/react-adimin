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
    3.async 函数的返回值是一个新的promise对象，promise的结果和值由async的结果来决定
        
    


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

    4.useEffect(()=>{},[]) 中，第一个参数回调函数不要设置成异步函数，因为异步函数会返回一个promise，而这个函数的返回值，设计是作为组件卸载时调用的函数

    5.useRef(initValue) 返回一个容器，要获取其中的值使用.current属性，保存在其中的值具有持久化的特性，在组件卸载前都不会发生变化

    6.useEffect(callback,deps) 
        deps是浅比较，也就是比较内存地址，不比较其内部数据是否变化

    7.setState(updater,[callback])
        (1)类组件中，使用setState更新状态，可以有两种方式
            1).updater为一个函数 (state,props)=>{} 函数会接受到两个参数，其中state保证为最新的state
            函数返回一个对象，React根据该对象对状态进行更新
            
            2).updater为一个对象，React根据该对象对状态进行更新

            3)传入对象和传入函数更新状态的区别在于，传入函数的操作，不会与之前的更新操作进行合并，而传入对象的操作，会将之前的更新操作合并



        (2)callback回调函数，在状态更新完成之后执行，可在函数中使用this.state获取到最新的更新后的状态

        (3)在React自己控制的同步过程中更新state，是一个“异步”行为，不会立刻获得值

        (4)在非React自己控制的异步过程中更新state，setState是一个同步行为，后续代码会在setState更新完状态，
            也就是render完之后执行。




## antd
    Form 表单初始值只在每次表格渲染的时候会套用，要实时更改，应该使用form.setFieldsValue({FormItemName:newValue})
        该方法传入的配置对象，键为form表单的name属性值，name在antd的组件里相当于它的Id
    Form 表单自动收集其中的Item下的数据，当给Item设置了name后，Item下的组件会收到两个参数，value和onChange



## 测试题

    1. 路由组件中的地址是什么匹配规则？ 
        <Route to="/home" component={Home}> 输入地址为/home/123时这个组件是否会被匹配？
    
    2. 在组件模块中，写在组件外的代码何时被执行？
        在组件加载时？在整体初始化运行时？
        目前看来是后者
    
    3.