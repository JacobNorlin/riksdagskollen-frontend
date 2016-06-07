/**
 * Created by johan on 15-09-25.
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import Test from './components/Test'
import {reducer, getInitialState} from './reducers/common'

// require less file to trigger webpack's less-loader
require('./less/style.less')

let rootElement = document.getElementById('app')

const store = createStore(reducer, getInitialState(), applyMiddleware(thunkMiddleware))

ReactDOM.render(
    <Provider store={store}>
        <Test/>
	</Provider>,
    rootElement
)
