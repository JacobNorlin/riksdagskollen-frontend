import {RIKSDAGSKOLLEN_FETCH_REQUEST, RIKSDAGSKOLLEN_FETCH_SUCCESS, RIKSDAGSKOLLEN_FETCH_ERROR} from '../actions/riksdagskollenApiActions.ts'
import * as _ from 'lodash'

interface IRiksdagskollenApiData{
    people: Array<any>//something
}

interface IRiksdagskollenApiCallState{
    isFetching:boolean
    apiData: IRiksdagskollenApiData
}

function initialState(): IRiksdagskollenApiCallState{
    return {
        isFetching: false,
        apiData:{
            people: []
        }
    }
}

export default function riksdagskollenApiCall(state: IRiksdagskollenApiCallState = initialState(), action: any) : any{
    switch(action.type){
        case RIKSDAGSKOLLEN_FETCH_REQUEST:
        {
            return _.assign({}, state, {
                isFetching: true
            })
        }
        case RIKSDAGSKOLLEN_FETCH_SUCCESS:
        {
            return _.assign({}, state, {
                isFetching: false,
                apiData:{
                    people: JSON.parse(action.response) 
                }
            })
        }
        default:
            return state
    }
}