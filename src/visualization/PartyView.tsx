import * as React from 'react'
import {connect} from 'react-redux'
import {Person, partyColor} from '../types/person.ts'
import {fetchPeople} from '../actions/riksdagskollenApiActions.ts'
import {selectPerson} from '../actions/visualizationActions.ts'
import * as _ from 'lodash'

interface PartyViewProps{
    dispatch?: Function,
    people?: any
}

type MemberBall = JSX.Element

class PartyView extends React.Component<PartyViewProps, {}>{
    
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(fetchPeople())
    }
    
    basePosition(){
        
    }
    
    createBalls(people: Array<Person>): Array<MemberBall>{
        const {dispatch} = this.props
        return _(people)
        .zipWith(_.range(1, people.length+1), (person:Person, i:number) => {
            return {person, i}
        }).map((t: any) => {
            const {person, i} = t
           
            const color = partyColor(person.party)
            return <circle
                index={i}
                key={person.person_id} 
                person={person} 
                fill={color} r={4} 
                cx={Math.random()*1000} 
                cy={Math.random()*1000}
                onClick={() => {dispatch(selectPerson(person))}}
            />  
        }).value()
    }
    
    render(): any{
        
        const {people} = this.props
        return <svg width={1000} height={1000}>{this.createBalls(people)} </svg>
    }   
}

function mapStateToProps(state:any): any{
    const {riksdagskollenApiCall} = state
    const {apiData, isFetching} = riksdagskollenApiCall
    const {people} = apiData
    return {
        isFetching,
        people
    }
}

export default connect(mapStateToProps)(PartyView)