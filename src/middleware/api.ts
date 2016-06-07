import {Promise} from 'es6-promise'
import * as fetch from 'isomorphic-fetch'
import {Action, ActionType, isActionOfType} from '../actions/common'
import {
    RequestAction,
    ResponseAction,
    Status,
    Endpoint
} from '../actions/api'

const API_BASE_URL = 'http://api.riksdagskollen.se'

const send = (method: string, endpoint: string): PromiseLike<string> => {
    const init: RequestInit = { method }

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
    if (!isActionOfType<RequestAction>(action, ActionType.Request)) {
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
            type: ActionType.Response,
            status: Status.Success,
            body: body
        }
        next(action)
    }, e => {
        const action: ResponseAction = {
            type: ActionType.Response,
            status: Status.Error,
            body: e.message
        }
        next(action)
    })
}

export default middleware
