type Party = "M" | "S" | "V" | "SD" | "L" | "MP" | "KD" | "C" | "KD" | "-"

export function partyColor(p: Party){
    switch(p){
        case "M": {
            return "#52bcee"
        }
        case "S": {
            return "#fc1921"
        }
        case "L": {
            return "#082171"
        }
        case "MP": {
            return "#2c912c"
        }
        case "SD": {
            return "#fedc01"
        }
        case "V": {
            return "#ed1b24"
        }
        case "KD": {
            return "#004d9f"
        }
        case "C": {
            return "#008f3e"
        }
        default: return "black"
    }
}

enum Gender{
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
