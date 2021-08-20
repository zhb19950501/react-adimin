import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router} from 'react-router-dom'
import {Provider} from "react-redux"

import localStorageUtils from "./utils/localStoreUtils"
import memoryUtils from "./utils/memoryUtils" 
import store from './redux/store'

const user = localStorageUtils.getUser("user_key")
memoryUtils.user = user 

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
        
    </Router>,document.getElementById("root"))