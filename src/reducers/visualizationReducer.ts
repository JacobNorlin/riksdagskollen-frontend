import {PERSON_SELECTED} from '../actions/visualizationActions'
import {Person} from '../types/person'
import * as _ from 'lodash'
import {Action} from './main'

interface VisualizationState{
    selectedPerson: Person
}

interface VisualizationAction extends Action {
    person: Person
}

const getInitialState = (): VisualizationState => {
    return {
        selectedPerson: undefined
    }
}

export {VisualizationState}

const reducer = (
    state: VisualizationState = getInitialState(),
    action: VisualizationAction): VisualizationState => {
    switch(action.type){
        case PERSON_SELECTED:{
            return _.assign<{}, VisualizationState>({}, state, {
                selectedPerson: action.person
            })
        }
    }
    return state
}

export default reducer
