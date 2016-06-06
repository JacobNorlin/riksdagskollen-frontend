import {Person} from '../types/person.ts'

export const PERSON_SELECTED = 'PERSON_SELECTED'

export function selectPerson(person: Person): any{
    return {
        person: person,
        type: PERSON_SELECTED
    }
}