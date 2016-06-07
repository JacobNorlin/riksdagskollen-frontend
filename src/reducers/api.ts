import {Person} from '../types/person'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {ResponseAction, Status} from '../actions/api'

interface ApiCallState {
    isFetching: boolean
    people: Person[]
}

const reducer = (state: ApiCallState, action: Action): ApiCallState => {
    if (isActionOfType<ResponseAction>(action, ActionType.Response)) {
        switch (action.status) {
            case Status.Success:
                return {
                    isFetching: false,
                    people: JSON.parse(action.body),
                }
        }
    }
    return state
}

export {ApiCallState, reducer}
