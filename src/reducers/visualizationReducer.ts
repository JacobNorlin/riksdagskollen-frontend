import {PERSON_SELECTED} from '../actions/visualizationActions.ts'
import {Person} from '../types/person.ts'
import * as _ from 'lodash'

export interface IVisualizationState{
    selectedPerson: Person
}

function initialState(): IVisualizationState{
    return {
        selectedPerson: undefined
    }
}

export default function visualizationReducer(state: IVisualizationState = initialState(), action: any){
    switch(action.type){
        case PERSON_SELECTED:{
            return _.assign({}, state, {
                selectedPerson: action.person
            })
        }
        default: 
            return state
    }
}