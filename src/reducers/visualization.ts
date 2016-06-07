import {Person} from '../types/person'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {SelectPersonAction} from '../actions/visualization'

interface VisualizationState {
    selectedPerson: Person
}

const reducer = (state: VisualizationState, action: Action): VisualizationState => {
    if (isActionOfType<SelectPersonAction>(action, ActionType.PersonSelected)) {
        switch (action.type) {
            case ActionType.PersonSelected:
                return {
                    selectedPerson: action.person,
                }
        }
    }

    return state
}

export {VisualizationState, reducer}
