import * as React from 'react'
import {connect} from 'react-redux'
import {createFetchAction, Endpoint} from '../actions/api'
import {selectPerson} from '../actions/visualization'
import * as d3 from 'd3'
import * as _ from 'lodash'
import {Person, partyColor} from '../types/person'
import PersonPanel from './PersonPanel'
import {AppState} from '../reducers/common'

interface ITestProps {
    dispatch: Redux.Dispatch,
    people: Person[],
    isFetching: boolean
}

class Test extends React.Component<ITestProps, void>{
    
    svg: any = undefined
    w: number = 1000
    h: number = 1000
    circles: any = undefined
    
    componentWillMount(){
        console.log("lol")
        const {dispatch} = this.props
        dispatch(createFetchAction(Endpoint.Person))
    }
    
    componentDidMount(){
       
       this.svg = d3.select(document.getElementById("d3root")).append("svg")
            .attr("width", this.w)
            .attr("height", this.h)
    }
    
    circlePosition(circles: any): any {
        console.log(circles)
        if(circles === undefined) return 
        const origin = {x:500, y:500}
        const r = 400
        const theta = 2*Math.PI
        const member = 348
        return circles
            .transition(2000)
            .ease("linear")
            .attr("cx", (p: Person, i: number) => {return origin.x+r*Math.cos(theta*(member-i)/member)})
            .attr("cy", (p: Person, i: number) => {return origin.y+r*Math.sin(theta*(member-i)/member)})
            .attr("r", 3)
    }
        
    basePosition(circles: any): any{
            const origin = {x:500, y:500}
            const r = 400
            const theta = -Math.PI
            const member = 348
            const membersPerRow = 12
            const distanceBetweenMembers = 14
            function round(i:number):number{
                return Math.ceil(i/membersPerRow)*membersPerRow
            }
            return circles
               .transition(2000)
               .ease("linear")
               .attr("cx", (p: Person, i: number) => {return origin.x+(r-(i%membersPerRow)*distanceBetweenMembers)*Math.cos(theta*(member-round(i))/member)})
               .attr("cy", (p: Person, i: number) => {return origin.y+(r-(i%membersPerRow)*distanceBetweenMembers)*Math.sin(theta*(member-round(i))/member)}) 
               .attr("r", 6)    
    }
    
    componentDidUpdate(){
        const {isFetching, people, dispatch} = this.props
        
        
        let sortedByParties = _.chain(people).sortBy('party').value()
        this.circles = this.svg.selectAll("circle")
            .data(sortedByParties)
            .enter()
            .append("circle")
            .attr("r", 6)
            .on('click', (p: Person) => {
                dispatch(selectPerson(p))
            })
            .attr("fill", (p: Person) => {
                return partyColor(p.party)
            })
            .attr("cx", 0)
            .attr("cy", 0)
        
        
        this.basePosition(this.circles)
        
        
       
    }
    
    render(): JSX.Element {
        
        return <div id="d3root">
            <button onClick={() => {this.circlePosition(this.circles)}}>circle</button>
            <button onClick={() => {this.basePosition(this.circles)}}>base</button>
            <PersonPanel/>
        </div>
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        isFetching: state.api.isFetching,
        people: state.api.people
    }
}

export default connect(mapStateToProps)(Test)
