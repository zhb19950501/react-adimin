import { combineReducers } from "redux";
import { 
    SET_HEAD_TITLE 

} from "./constance"

function headTitle(preState="",action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return preState;
    }
}

function user(preState={},action) {
    switch (action.type) {
        default:
            return preState;
    }
}

export default combineReducers({headTitle,user})