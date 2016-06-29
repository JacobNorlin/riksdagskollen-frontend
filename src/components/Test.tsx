import * as React from 'react'
import {connect} from 'react-redux'
import {fetch, Endpoint} from '../actions/api'
import {selectPerson} from '../actions/visualization'
import * as d3 from 'd3'
import * as _ from 'lodash'
import {Person, PartyColor, Gender} from '../types/person'
import PersonPanel from './PersonPanel'
import {AppState} from '../reducers/common'

interface ITestProps {
    dispatch: Redux.Dispatch,
    people: Person[],
    isFetching: boolean
}

class Test extends React.Component<ITestProps, void>{

    svg: d3.Selection<Person>
    w: number = 1000
    h: number = 1000
    circles: d3.Selection<Person>
    svgRef = 'my-svg'

    componentWillMount() {
        console.log('lol')
        const dispatch = this.props.dispatch
        dispatch(fetch(Endpoint.Person))
    }

    componentDidMount() {
        this.svg = d3.select(this.refs[this.svgRef] as HTMLElement) as d3.Selection<Person>
    }

    circlePosition(circles: d3.Selection<Person>): void {
        const origin = { x: 500, y: 500 }
        const r = 400
        const theta = 2 * Math.PI
        const member = 348

        circles
            .transition()
            .duration(2000)
            .ease('linear')
            .attr('cx', (p, i) => origin.x + r * Math.cos(theta * (member - i) / member))
            .attr('cy', (p, i) => origin.y + r * Math.sin(theta * (member - i) / member))
            .attr('r', 3)
    }

    basePosition(circles: d3.Selection<Person>): void {
        const origin = { x: 500, y: 500 }
        const r = 400
        const theta = -Math.PI
        const member = 348
        const membersPerRow = 12
        const distanceBetweenMembers = 14
        function round(i: number): number {
            return Math.ceil(i / membersPerRow) * membersPerRow
        }
        d3.selectAll('circle')
            .transition()
            .duration(2000)
            .ease('linear')
            .attr('cx', (p, i) => origin.x + (r - (i % membersPerRow) * distanceBetweenMembers) * Math.cos(theta * (member - round(i)) / member))
            .attr('cy', (p, i) => origin.y + (r - (i % membersPerRow) * distanceBetweenMembers) * Math.sin(theta * (member - round(i)) / member))
    }

    barPosition(){
        function round(i: number): number {
            return Math.ceil(i / 3) * 3
        }
        d3.selectAll('circle')
            .transition()
            .duration(2000)
            .filter((p: Person) => {
                return p.gender == Gender.Female
            })
            .attr('cx', (p:Person, i:number) => {
                return 200
            })
            .attr('cy', (p:Person, i:number) => {
                console.log( ((348 - round(i))))
                return 500 - i*2
            })
        d3.selectAll('circle').filter((p: Person) => {
            return p.gender == Gender.Male
        })
        .transition()
        .duration(2000)
        .attr('cx', (p:Person, i:number) => {
                return 400
            })
            .attr('cy', (p:Person, i:number) => {
                console.log( ((348 - round(i))))
                return 500 - i*2
            })

    }

    componentDidUpdate() {
        const {people, dispatch} = this.props

        let sortedByParties = _.chain(people).sortBy(p => p.party).value()
        this.circles = this.svg.selectAll('circle')
            .data(sortedByParties)
            .on('click', p => {
                dispatch(selectPerson(p))
            })
            .attr('cx', 0)
            .attr('cy', 0)

        this.basePosition(this.circles)
    }

    render(): JSX.Element {

        return <div>
            <button onClick={() => { this.barPosition() } }>circle</button>
            <button onClick={() => { this.basePosition(this.circles) } }>base</button>
            <svg width={this.w} height={this.h} ref={this.svgRef}>
                {this.props.people.map(p => (
                    <circle r={6} fill={PartyColor[p.party]} />
                ))}
            </svg>
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
