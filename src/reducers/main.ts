import riksdagskollenApiCall from './apiReducer'
import visualizationReducer from './visualizationReducer'
import {combineReducers} from 'redux'

interface Action {
    type: string
}

export {Action}
export default combineReducers({riksdagskollenApiCall, visualizationReducer})
