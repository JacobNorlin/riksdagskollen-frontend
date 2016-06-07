enum ActionType {
    Request,
    Response,
    PersonSelected,
    UpdatePositions
}

interface Action {
    type: ActionType
}

const isActionOfType = <T extends Action>(action: Action, type: ActionType): action is T => {
    return action.type === type
}

export {Action, ActionType, isActionOfType}
