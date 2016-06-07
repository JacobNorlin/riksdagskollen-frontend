import {Person, Coord} from '../types/person'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {SelectPersonAction, UpdatePositionsAction} from '../actions/visualization'


interface VisualizationState {
    selectedPerson: Person,
    positions: Coord[]
}

const reducer = (state: VisualizationState, action: Action): VisualizationState => {
    if (isActionOfType<SelectPersonAction>(action, ActionType.PersonSelected)) {
        switch (action.type) {
            case ActionType.PersonSelected:
                return {
                    selectedPerson: action.person,
                    positions: state.positions
                }
            
        }
    }else if(isActionOfType<UpdatePositionsAction>(action, ActionType.UpdatePositions)){
        switch (action.type){
            case ActionType.UpdatePositions:
                return {
                    selectedPerson: state.selectedPerson,
                    positions: action.positions
                }
        }
    }

    return state
}

export {VisualizationState, reducer}
