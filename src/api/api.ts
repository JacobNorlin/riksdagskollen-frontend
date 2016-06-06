import {Promise} from 'es6-promise'
import * as fetch from 'isomorphic-fetch'
import {Action} from '../reducers/main'
import {isRequestAction, RequestAction, ResponseAction, Status, Type, Endpoint} from '../actions/riksdagskollenApiActions'

const API_BASE_URL = 'http://api.riksdagskollen.se'

const send = (method: string, endpoint: string): PromiseLike<string> => {
    var init: RequestInit = { method }

    const promise = fetch(API_BASE_URL + endpoint, init).then(response => {
        return response.text().then(text => ({ text, response }))
    }).then(data => {
        if (!data.response.ok) {
            Promise.reject(data.text)
        }
        return data.text
    })
    return promise
}

const middleware: Redux.Middleware = (store: Redux.Store) => (next: Redux.Dispatch) => (action: Action) => {
    if (!isRequestAction(action)) {
        return next(action)
    }
    const r = action as RequestAction
    var endpointUrl: string

    switch (r.endpoint) {
        case Endpoint.Person:
        endpointUrl = '/person'
        break
    }

    return send('GET', endpointUrl).then(body => {
        const action: ResponseAction = {
            type: Type.Response,
            status: Status.Success,
            body: body
        }
        next(action)
    }, e => {
        const action: ResponseAction = {
            type: Type.Response,
            status: Status.Error,
            body: e.message
        }
        next(action)
    })
}

export default middleware
