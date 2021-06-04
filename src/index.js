import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router} from 'react-router-dom'

import localStorageUtils from "./utils/localStoreUtils"
import memoryUtils from "./utils/memoryUtils" 

const user = localStorageUtils.getUser("user_key")
memoryUtils.user = user 
ReactDOM.render(
    <Router>
        <App/>
    </Router>,document.getElementById("root"))