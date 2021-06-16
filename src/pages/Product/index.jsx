import { Route,Switch,Redirect } from "react-router-dom";


import Home from "./Home"
import Detail from "./Detail"
import AddUpdate from "./AddUpdate"
export default function Product(params) {
    return(
        <Switch>
            <Route path="/product" component={Home} exact/>
            <Route path="/product/detail" component={Detail}/>
            <Route path="/product/addupdate" component={AddUpdate}/>
            <Redirect to="/product"></Redirect>
        </Switch>
    )
}