import * as React from 'react'
import {connect} from 'react-redux'
import {fetchPeople} from '../actions/riksdagskollenApiActions.ts'
import * as d3 from 'd3'
import * as _ from 'lodash'
import {Person, partyColor} from '../types/person.ts'
import PersonPanel from './PersonPanel.tsx'
import {selectPerson} from '../actions/visualizationActions.ts'

interface ITestProps {
    dispatch?: Function,
    people?: any,
    isFetching?: boolean
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


class Test extends React.Component<ITestProps, {}>{
    
    svg: any = undefined
    w: number = 1000
    h: number = 1000
    
    componentWillMount(){
        console.log("lol")
        const {dispatch} = this.props
        dispatch(fetchPeople())
    }
    
    componentDidMount(){
       
       this.svg = d3.select(document.getElementById("d3root")).append("svg")
            .attr("width", this.w)
            .attr("height", this.h)
    }
    
    componentDidUpdate(){
        const {isFetching, people, dispatch} = this.props
        
        let groupedByParties = _.chain(people).sortBy('party').value()
        let circles = this.svg.selectAll("circle")
            .data(groupedByParties)
            .enter()
            .append("circle")
        
        const origin = {x:500, y:500}
        const r = 400
        const theta = -Math.PI
        const member = 348
        
        circles.attr("cx", (p: Person, i: number) => {return origin.x+r*Math.cos(theta*(member-i)/member)})
               .attr("cy", (p: Person, i: number) => {return origin.y+r*Math.sin(theta*(member-i)/member)})
               .attr("r", 2)
               .on('click', (p: Person) => {
                   dispatch(selectPerson(p))
               })
               .attr("fill", (p: Person) => {
                   return partyColor(p.party)
               })
       
    }
    
    render(): any{
        
        return <div id="d3root">
            <PersonPanel/>
        </div>
    }
}
    
export default connect(mapStateToProps)(Test)