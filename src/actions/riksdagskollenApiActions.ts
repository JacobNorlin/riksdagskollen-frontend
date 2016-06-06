import {Action, ActionType} from '../reducers/main'

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

const createFetchAction = (endpoint: Endpoint): RequestAction => {
    return {
        type: ActionType.Request,
        endpoint: endpoint,
    }
}

export {
    Endpoint,
    Status,
    RequestAction,
    ResponseAction,
    createFetchAction,
}
