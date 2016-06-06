import {RIKSDAGSKOLLEN_FETCH_REQUEST, RIKSDAGSKOLLEN_FETCH_SUCCESS, RIKSDAGSKOLLEN_FETCH_ERROR} from '../actions/riksdagskollenApiActions.ts'
import * as _ from 'lodash'
import {Person} from '../types/person.ts'
import {Action} from './main'

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

interface ApiCallAction extends Action {
    response: string
}

const apiCall = (state: ApiCallState = getInitialState(), action: ApiCallAction): ApiCallState => {
    switch (action.type) {
        case RIKSDAGSKOLLEN_FETCH_REQUEST:
            return _.assign<{}, ApiCallState>({}, state, {
                isFetching: true
            })
        case RIKSDAGSKOLLEN_FETCH_SUCCESS:
            return _.assign<{}, ApiCallState>({}, state, {
                isFetching: false,
                apiData: {
                    people: JSON.parse(action.response)
                }
            })
    }
    return state
}

export default apiCall
