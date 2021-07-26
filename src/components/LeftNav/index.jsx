import {Link, useHistory} from "react-router-dom"

import LeftMenu from "./LeftMenu"
import "./index.less"
import logo from "../../assets/images/login-logo.png"

export default function LeftNav(){
    const history = useHistory()
    return (
        <div className="left-nav">
            <Link to="/" className = "left-nav-header">
                <img src={logo} alt="" />
                <h1>硅谷后台</h1>
            </Link>
            <LeftMenu/>
            <button onClick={()=>{history.push("./test")}}>Test</button>
        </div>
    )
}