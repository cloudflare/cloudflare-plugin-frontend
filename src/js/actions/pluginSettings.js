import {
    pluginSettingListGet,
    pluginSettingPatch,
    pluginResponseOk
} from '../utils/PluginAPI/PluginAPI';
import { notificationAddSuccess, notificationAddClientAPIError } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function pluginFetchSettings() {
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH
    }
}

export function pluginFetchSettingsSuccess(zoneId, setting) {
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
        zoneId,
        setting
    }
}

export function pluginFetchSettingsError() {
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_ERROR
    }
}

export function pluginUpdateSetting(zoneId, setting) {
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE,
        zoneId,
        setting
    }
}

export function pluginUpdateSettingSuccess(zoneId, setting) {
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_SUCCESS,
        zoneId,
        setting
    }
}

export function pluginUpdateSettingError(zoneId, setting) {
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_ERROR,
        zoneId,
        setting
    }
}

export function asyncPluginFetchSettings(zoneId) {
    return dispatch => {
        dispatch(pluginFetchSettings());
        pluginSettingListGet({zoneId: zoneId}, function(response){
            if(pluginResponseOk(response)) {
                dispatch(pluginFetchSettingsSuccess(zoneId, response.body.result));
            } else {
                dispatch(notificationAddClientAPIError(pluginFetchSettingsError(),response));
            }
        }, function(error) {
            dispatch(notificationAddClientAPIError(pluginFetchSettingsError(), error));
        });
    }
}

export function asyncPluginUpdateSetting(settingName, zoneId, value) {
    return (dispatch, getState) => {
        let oldSetting = getState().pluginSettings.entities[zoneId][settingName];

        dispatch(pluginUpdateSetting(zoneId, {'id': settingName, 'value': value }));
        pluginSettingPatch(zoneId, settingName, value, function(response) {
            if(pluginResponseOk(response)) {
                dispatch(pluginUpdateSettingSuccess(zoneId, response.body.result));

                if (settingName == "default_settings") {
                    dispatch(notificationAddSuccess("container.applydefaultsettingscard.success", true));
                }
            } else {
                dispatch(notificationAddClientAPIError(pluginUpdateSettingError(zoneId, oldSetting), response));
            }
        },
        function(error) {
            dispatch(notificationAddClientAPIError(pluginUpdateSettingError(zoneId, oldSetting), error));
        });
    }
}