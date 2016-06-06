/**
 * Created by johan on 15-09-25.
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import * as Redux from 'redux'
import {Provider, connect} from 'react-redux'
import app from './reducers/main.ts'
import thunkMiddleware from 'redux-thunk'

import riksdagskollenApi from './api/api.ts'
import Test from './components/Test.tsx'

// require less file to trigger webpack's less-loader
require('./less/style.less')



let createStoreWithMiddleware = Redux.applyMiddleware(thunkMiddleware, riksdagskollenApi)(Redux.createStore)

let store = createStoreWithMiddleware(app)

let rootElement = document.getElementById('app')


ReactDOM.render(
    <Provider store={store}>
        <Test/>
	</Provider>,
    rootElement
)