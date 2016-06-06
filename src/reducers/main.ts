import riksdagskollenApiCall from './apiReducer'
import visualizationReducer from './visualizationReducer'
import {combineReducers} from 'redux'

enum ActionType {
    Request,
    Response,
    PersonSelected,
}

interface Action {
    type: ActionType
}

const isActionOfType = <T extends Action>(action: Action, type: ActionType): action is T => {
    return action.type === type
}

export {Action, ActionType, isActionOfType}
export default combineReducers({riksdagskollenApiCall, visualizationReducer})
