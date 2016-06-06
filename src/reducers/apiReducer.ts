import * as _ from 'lodash'
import {Person} from '../types/person'
import {Action, ActionType, isActionOfType} from './main'
import {ResponseAction, Status} from '../actions/riksdagskollenApiActions'

interface ApiCallState {
    isFetching: boolean
    apiData: {
        people: Person[]
    }
}

const getInitialState = (): ApiCallState => {
    return {
        isFetching: false,
        apiData: {
            people: []
        }
    }
}

const reducer = (state: ApiCallState = getInitialState(), action: Action): ApiCallState => {

    if (!isActionOfType<ResponseAction>(action, ActionType.Response)) {
        return state
    }

    const r = action as ResponseAction

    switch (r.status) {
        case Status.Success:
            return _.assign<{}, ApiCallState>({}, state, {
                isFetching: false,
                apiData: {
                    people: JSON.parse(r.body)
                }
            })
    }
    return state
}

export default reducer
