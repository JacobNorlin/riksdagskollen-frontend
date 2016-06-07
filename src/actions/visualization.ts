import {Person, Coord} from '../types/person'
import {Action, ActionType} from './common'

interface SelectPersonAction extends Action {
    person: Person
}

interface UpdatePositionsAction extends Action {
    positions: Coord[]
}

const selectPerson = (person: Person): SelectPersonAction => {
    return {
        type: ActionType.PersonSelected,
        person: person,
    }
}

const updatePositions = (positions: Coord[]): UpdatePositionsAction => {
    return {
        type: ActionType.UpdatePositions,
        positions: positions
    }
}

export {selectPerson, updatePositions, SelectPersonAction, UpdatePositionsAction}
