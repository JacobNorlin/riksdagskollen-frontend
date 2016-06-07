import {ApiCallState, reducer as apiReducer} from './api'
import {VisualizationState, reducer as visReducer} from './visualization'
import {Action} from '../actions/common'

interface AppState {
    api: ApiCallState
    visualization: VisualizationState
}

const getInitialState = (): AppState => {
    return {
        api: {
            isFetching: false,
            people: [],
        },
        visualization: {
            selectedPerson: undefined,
        },
    }
}

const reducer = (state: AppState, action: Action): AppState => {
    return {
        api: apiReducer(state.api, action),
        visualization: visReducer(state.visualization, action),
    }
}

export {AppState, reducer, getInitialState}
