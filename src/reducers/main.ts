import riksdagskollenApiCall from './riksdagskollenApiReducer.ts'
import visualizationReducer from './visualizationReducer.ts'
import {combineReducers} from 'redux'

interface Action {
    type: string
}

export {Action}
export default combineReducers({riksdagskollenApiCall, visualizationReducer})
