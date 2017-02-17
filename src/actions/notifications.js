import * as ActionTypes from '../constants/ActionTypes';
import { getZoneSettingsValueForZoneId } from '../selectors/zoneSettings';
import _ from 'lodash';

export function notificationAdd(level, message, localized = false, persistant = false, delay = 5000) {
    return {
        type: ActionTypes.NOTIFICATION_ADD,
        level,
        message,
        localized,
        persistant,
        delay
    };
}

export function notificationAddSuccess(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd('success', message, localized, persistant, delay);
}

export function notificationAddInfo(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd('info', message, localized, persistant, delay);
}

export function notificationAddWarning(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd('warning', message, localized, persistant, delay);
}

export function notificationAddError(message, localized = false, persistant = false, delay = 5000) {
    return notificationAdd('error', message, localized, persistant, delay);
}

export function notificationRemove(key) {
    return {
        type: ActionTypes.NOTIFICATION_REMOVE,
        key
    };
}

export function notificationAddClientAPIError(errorAction, errorMessage) {
    return dispatch => {
        dispatch(errorAction);
        if(typeof errorMessage === 'string') {
            dispatch(notificationAddError(errorMessage));
        } else {
            errorMessage.body.errors.forEach(function(error) {
                dispatch(notificationAddError(error.message));
            });
        }
    };
}

export function notificationAddHostAPIError(errorAction, errorMessage) {
    return dispatch => {
        dispatch(errorAction);
        if(typeof errorMessage === 'string') {
            dispatch(notificationAddError(errorMessage));
        } else {
            dispatch(notificationAddError(errorMessage.body.msg));
        }
    };
}

export function notificationHandleDevelopmentMode(activeZoneId) {
    return (dispatch, getState) => {
        let notifications = getState().notifications;
        let developmentModeValue = getZoneSettingsValueForZoneId(activeZoneId, "development_mode", getState());

        var notificationKey = null;
        _.forEach(notifications, function(notification) {
            if (notification["level"] === "warning" && notification["message"] === "warning.developmentmode") {
                notificationKey = notification["key"];
            }
        });

        if (developmentModeValue === "on" && notificationKey === null) {
            dispatch(notificationAddWarning('warning.developmentmode', true, true));
        } 

        if (developmentModeValue === "off" && notificationKey !== null) {
            dispatch(notificationRemove(notificationKey));
        }
    }
}
