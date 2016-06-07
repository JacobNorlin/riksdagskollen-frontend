import {Person} from '../types/person'
import {Action, ActionType} from './common'

interface SelectPersonAction extends Action {
    person: Person
}

const selectPerson = (person: Person): SelectPersonAction => {
    return {
        type: ActionType.PersonSelected,
        person: person,
    }
}

export {selectPerson, SelectPersonAction}
