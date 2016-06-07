import {Person} from '../types/person'
import * as _ from 'lodash'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {SelectPersonAction} from '../actions/visualization'

interface VisualizationState {
    selectedPerson: Person
}

interface VisualizationAction extends Action {
    person: Person
}

const reducer = (state: VisualizationState, action: Action): VisualizationState => {
    if (!isActionOfType<SelectPersonAction>(action, ActionType.PersonSelected)) {
        return state
    }
    const a = action as SelectPersonAction
    switch (a.type) {
        case ActionType.PersonSelected:
            return _.assign<{}, VisualizationState>({}, state, {
                selectedPerson: a.person
            })
    }
    return state
}

export {VisualizationState, reducer}
