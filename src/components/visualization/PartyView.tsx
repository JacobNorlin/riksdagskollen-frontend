import * as React from 'react'
import {connect} from 'react-redux'
import {Person, PartyColor, Coord} from '../../types/person'
import {fetch, Endpoint} from '../../actions/api'
import {selectPerson, updatePositions} from '../../actions/visualization'
import {AppState} from '../../reducers/common'
import * as _ from 'lodash'


interface PartyViewProps {
    dispatch: Redux.Dispatch,
    people: Person[],
    isFetching: boolean,
    positions: Coord[]
}

type MemberBall = JSX.Element

class PartyView extends React.Component<PartyViewProps, {}>{
    
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(fetch(Endpoint.Person))
    }
    
    basePosition(people: Person[]): Coord[]{
        const origin = { x: 500, y: 500 }
        const r = 400
        const theta = -Math.PI
        const member = people.length
        const membersPerRow = 12
        const distanceBetweenMembers = 14
        function round(i: number): number {
            return Math.ceil(i / membersPerRow) * membersPerRow
        }
        return _(_.range(0, people.length)).map((i:number) => {
            return {
                x: origin.x + (r - (i % membersPerRow) * distanceBetweenMembers) * Math.cos(theta * (member - round(i)) / member),
                y: origin.y + (r - (i % membersPerRow) * distanceBetweenMembers) * Math.sin(theta * (member - round(i)) / member)
            }
        }).value()
    }
    
    circlePosition(people: Person[]): Coord[] {
        const origin = { x: 500, y: 500 }
        const r = 400
        const theta = 2 * Math.PI
        const member = 348


        return _(_.range(0, people.length)).map((i:number) => {
            return {
                x: origin.x + r * Math.cos(theta * (member - i) / member),
                y: origin.y + r * Math.sin(theta * (member - i) / member)
            }
        }).value()
    }
    
    createBalls(people: Person[], positions: Coord[]): MemberBall[]{
        const {dispatch} = this.props
        return _(people)
        .sortBy('party')
        .zipWith(positions, (person: Person, position: Coord) => {
            return {person, position}
        })
        .map((t: any) => {
            const {person, position} = t
            
            const color = PartyColor[person.party]
            return <circle
                key={person.person_id} 
                person={person} 
                fill={color} r={4} 
                cx={position === undefined ? 0 : position.x}
                cy={position === undefined ? 0 : position.y}
                onClick={() => {dispatch(selectPerson(person))}}
            />  
        }).value()
    }
    
    render(): JSX.Element{
        const {people, dispatch, positions} = this.props
        return <div>
            <button onClick={() => {dispatch(updatePositions(this.basePosition(people)))}}>base</button>
            <button onClick={() => {dispatch(updatePositions(this.circlePosition(people)))}}>circle</button>
            <svg width={1000} height={600}>{this.createBalls(people, positions)} </svg>
        </div>
    }   
}

const mapStateToProps = (state: AppState) => {
    console.log(state)
    return {
        isFetching: state.api.isFetching,
        people: state.api.people,
        positions: state.visualization.positions
    }
}

export default connect(mapStateToProps)(PartyView)