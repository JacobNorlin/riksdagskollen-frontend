import {Component} from 'react'
import {connect} from 'react-redux'
import {Person} from '../types/person.ts'
import {IVisualizationState} from '../reducers/visualizationReducer.ts'
import * as React from 'react'

interface IPersonPanelProps{
    dispatch?: Function,
    selectedPerson?: Person
}


class PersonPanel extends Component<IPersonPanelProps, {}>{
    
    render(){
        const {selectedPerson} = this.props
        if(selectedPerson === undefined){
            return <b>LMAO</b>
        }
        return <div className="panel panel-default">
            <div className="panel-heading">
                {selectedPerson.first_name + " " + selectedPerson.last_name}
            </div>
            <div class="panel-body">
                <ul>
                    <li> Parti: {selectedPerson.party} </li>
                    <li> Född: {selectedPerson.birth_year}</li>
                    <li> Status: {selectedPerson.status} </li>
                    <li> Kön: {selectedPerson.gender == 0 ? "Kvinna" : "Man"} </li>
                </ul>
            </div>
        </div>
    }
    
}


function mapStateToProps(state: any): IPersonPanelProps{
    const {visualizationReducer} = state
    const {selectedPerson} = visualizationReducer
    return{
        selectedPerson
    }
}

export default connect(mapStateToProps)(PersonPanel)