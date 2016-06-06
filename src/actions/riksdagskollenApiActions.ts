import {Action} from '../reducers/main'

const Type = {
    Request: 'ACTION_REQUEST',
    Response: 'ACTION_RESPONSE',
}

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

const isRequestAction = (action: Action): action is RequestAction => action.type === Type.Request
const isResponseAction = (action: Action): action is ResponseAction => action.type === Type.Response

const fetch = (endpoint: Endpoint): RequestAction => {
    return {
        type: Type.Request,
        endpoint: endpoint,
    }
}

export {
    Type,
    Endpoint,
    RequestAction,
    ResponseAction, 
    isRequestAction,
    isResponseAction,
    fetch,
    Status,
}
