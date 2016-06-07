import * as _ from 'lodash'
import {Person} from '../types/person'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {ResponseAction, Status} from '../actions/api'

interface ApiCallState {
    isFetching: boolean
    people: Person[]
}

const reducer = (state: ApiCallState, action: Action): ApiCallState => {
    if (!isActionOfType<ResponseAction>(action, ActionType.Response)) {
        return state
    }
    const r = action as ResponseAction
    switch (r.status) {
        case Status.Success:
            return _.assign<{}, ApiCallState>({}, state, {
                isFetching: false,
                people: JSON.parse(r.body)
            })
    }
    return state
}

export {ApiCallState, reducer}
