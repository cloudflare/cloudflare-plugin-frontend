import {
    pluginSettingListGet,
    pluginSettingPatch,
    pluginResponseOk
} from '../utils/PluginAPI/PluginAPI';
import { notificationAddClientAPIError } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function pluginFetchSettings() {
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH
    }
}

export function pluginFetchSettingsSuccess(zoneId, pluginSettings) {
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
        zoneId,
        pluginSettings
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

export function PluginUpdateSettingError(zoneId, setting) {
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_ERROR,
        zoneId,
        setting
    }
}


export function asyncPluginFetchSettings(zoneId) {
    return dispatch => {
        dispatch(pluginFetchSettings());

        var response = { 
            "success": true, 
            "errors": [], 
            "messages": [],
            "result": [{ 
                "id": "ip_rewrite", 
                "value": true, 
                "editable": true, 
                "modified_on": "" 
            }]
         }

        console.log("FETCH " + true);

        // Mock
        dispatch(pluginFetchSettingsSuccess(zoneId, response.result));         

        // pluginSettingListGet({zoneId: zoneId}, function(response){
        //     if(pluginResponseOk(response)) {
        //         dispatch(pluginFetchSettingsSuccess(zoneId, response.body.result));
        //     } else {
        //         dispatch(notificationAddClientAPIError(pluginFetchSettingsError(),response));
        //     }
        // }, function(error) {
        //     dispatch(notificationAddClientAPIError(pluginFetchSettingsError(), error));
        // });
    }
}

export function asyncPluginUpdateSetting(settingName, zoneId, value) {
    return (dispatch, getState) => {
        let oldSetting = getState().pluginSettings.entities[zoneId][settingName];

        dispatch(pluginUpdateSetting(zoneId, { 'id': settingName, 'value': value }));
        
        var response = { 
            "success": true, 
            "errors": [], 
            "messages": [],
            "result": { 
                "id": "ip_rewrite", 
                "value": value, 
                "editable": true, 
                "modified_on": "" 
            }
         }

         console.log("UPDATE " + value);

        // Mock
        dispatch(pluginUpdateSettingSuccess(zoneId, response.result));

        // pluginSettingPatch(settingName, zoneId, value, function(response) {
        //     if(pluginResponseOk(response)) {
        //         dispatch(pluginUpdateSettingSuccess(zoneId, response.body.result));
        //     } else {
        //         dispatch(notificationAddClientAPIError(pluginUpdateSettingError(zoneId, oldSetting), response));
        //     }
        // },
        // function(error) {
        //     dispatch(notificationAddClientAPIError(pluginUpdateSettingError(zoneId, oldSetting), error));
        // });
    }
}