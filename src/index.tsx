/**
 * Created by johan on 15-09-25.
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import PersonPanel from './components/PersonPanel'
import PartyView from './components/visualization/PartyView'
import {reducer, getInitialState} from './reducers/common'
import App from './components/App'

// require less file to trigger webpack's less-loader
require('./less/style.less')

let rootElement = document.getElementById('app')

const store = createStore(reducer, getInitialState(), applyMiddleware(thunkMiddleware))

ReactDOM.render(
    <Provider store={store}>
        <App/>
	</Provider>,
    rootElement
)
