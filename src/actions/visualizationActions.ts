import {Person} from '../types/person.ts'
import {Action, ActionType} from '../reducers/main'

interface SelectPersonAction extends Action {
    person: Person
}

const selectPerson = (person: Person): SelectPersonAction => {
    return {
        type: ActionType.PersonSelected,
        person: person,
    }
}

export {selectPerson}
