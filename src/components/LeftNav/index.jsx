import {Link} from "react-router-dom"

import LeftMenu from "./LeftMenu"
import "./index.less"
import logo from "../../assets/images/login-logo.png"

export default function LeftNav(){
    return (
        <div className="left-nav">
            <Link to="/" className = "left-nav-header">
                <img src={logo} alt="" />
                <h1>硅谷后台</h1>
            </Link>
            <LeftMenu/>
        </div>
    )
}