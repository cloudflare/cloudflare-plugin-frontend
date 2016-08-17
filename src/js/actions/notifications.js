import * as ActionTypes from '../constants/ActionTypes';

export function notificationAdd(level, message, localized = false, persistant = false, delay = 5000) {
    return {
        type: ActionTypes.NOTIFICATION_ADD,
        level,
        message,
        localized,
        persistant,
        delay
    }
}

export function notificationAddSuccess(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd("success", message, localized, persistant, delay);
}

export function notificationAddInfo(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd("info", message, localized, persistant, delay);
}

export function notificationAddWarning(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd("warning", message, localized, persistant, delay);
}

export function notificationAddError(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd("error", message, localized, persistant, delay);
}

export function notificationRemove(key) {
    return {
        type: ActionTypes.NOTIFICATION_REMOVE,
        key
    }
}

export function notificationAddClientAPIError(errorAction, errorMessage) {
    return dispatch => {
        dispatch(errorAction);
        if(typeof errorMesages === "string") {
            dispatch(notificationAddError(errorMessages));
        } else {
            errorMessage.body.errors.forEach(function(error) {
                dispatch(notificationAddError(error.message));
            });
        }
    }
}
