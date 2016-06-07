type Party = "M" | "S" | "V" | "SD" | "L" | "MP" | "KD" | "C" | "KD" | "-"

export const PartyColor: {[key: string]: string} = {
    M: '#52bcee',
    S: '#fc1921',
    L: '#082171',
    MP: '#2c912c',
    SD: '#fedc01',
    V: '#ed1b24',
    KD: '#004d9f',
    C: '#008f3e',
}

enum Gender {
    Female = 0,
    Male = 1   
}

export interface Person {
    person_id: string,
    birth_year: number,
    gender:  Gender,
    first_name: string,
    last_name: string,
    party: Party,
    status: string
}
