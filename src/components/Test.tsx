import * as React from 'react'
import {connect} from 'react-redux'
import {fetchPeople} from '../actions/riksdagskollenApiActions.ts'

interface ITestProps {
    dispatch?: Function,
    people?: any,
    isFetching?: boolean
}
function mapStateToProps(state:any): any{
    console.log(state)
    const {riksdagskollenApiCall} = state
    const {apiData, isFetching} = riksdagskollenApiCall
    const {people} = apiData

    return {
        isFetching,
        people
    }
}


class Test extends React.Component<ITestProps, {}>{
    
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(fetchPeople())
    }
    
    render(): any{
        const {isFetching, people} = this.props
        console.log(isFetching)
        if(isFetching){
            return <b>Loading...</b>
        }
        return <div>{people.map((p: any) => {return <b key={p.person_id}>{p.person_id}</b>})}</div>
    }
}
    
export default connect(mapStateToProps)(Test)