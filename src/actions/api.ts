import * as isofetch from 'isomorphic-fetch'
import {Action, ActionType} from './common'

enum Status {
    Success,
    Error,
}

enum Endpoint {
    Person,
}

interface RequestAction extends Action {
    endpoint: Endpoint
}

interface ResponseAction extends Action {
    status: Status
    body: string
}

const API_BASE_URL = 'http://api.riksdagskollen.se'

const send = (method: string, endpoint: string): PromiseLike<string> => {
    const init: RequestInit = { method }

    const promise = isofetch(API_BASE_URL + endpoint, init).then(response => {
        return response.text().then(text => ({ text, response }))
    }).then(data => {
        if (!data.response.ok) {
            Promise.reject(data.text)
        }
        return data.text
    })
    return promise
}

const fetch = (endpoint: Endpoint): ReduxThunk.ThunkInterface => {
    var endpointUrl: string
    switch (endpoint) {
        case Endpoint.Person:
            endpointUrl = '/person'
            break
    }

    return (dispatch: Redux.Dispatch) => {
        send('GET', endpointUrl).then(body => {
            const action: ResponseAction = {
                type: ActionType.Response,
                status: Status.Success,
                body: body
            }
            dispatch(action)
        }, e => {
            const action: ResponseAction = {
                type: ActionType.Response,
                status: Status.Error,
                body: e.message
            }
            dispatch(action)
        })
    }
}

export {
    Endpoint,
    Status,
    RequestAction,
    ResponseAction,
    fetch,
}
