import * as React from 'react'
import PersonPanel from './PersonPanel'
import PartyView from './visualization/PartyView'

interface AppProps{
    
}

export default class App extends React.Component<AppProps, {}>{
    render(): JSX.Element{
        return <div>
            <PersonPanel/>
            <PartyView />
        </div>
    }
}