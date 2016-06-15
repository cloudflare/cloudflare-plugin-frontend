import {
    pluginSettingListGet,
    pluginSettingPatch,
    pluginResponseOk
} from '../utils/PluginAPI/PluginAPI';
import { notificationAddClientAPIError } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function pluginFetchSettings() {
    console.log("pluginFetchSettings ");
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH
    }
}

export function pluginFetchSettingsSuccess(zoneId, pluginSettings) {
    console.log("pluginFetchSettingsSuccess ");
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
        zoneId,
        pluginSettings
    }
}

export function pluginFetchSettingsError() {
    console.log("pluginFetchSettingsError ");
    return {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_ERROR
    }
}

export function pluginUpdateSetting(zoneId, setting) {
    console.log("pluginUpdateSetting " + zoneId);
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE,
        zoneId,
        setting
    }
}

export function pluginUpdateSettingSuccess(zoneId, setting) {
    console.log("pluginUpdateSettingSuccess "+ zoneId + " " + setting);
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_SUCCESS,
        zoneId,
        setting
    }
}

export function PluginUpdateSettingError(zoneId, setting) {
    console.log("PluginUpdateSettingError " + zoneId + " " + setting);
    return {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_ERROR,
        zoneId,
        setting
    }
}


export function asyncPluginFetchSettings(zoneId) {
        console.log("asyncPluginFetchSettings " + zoneId);

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
        console.log("QQQQQ");
        console.log(getState().pluginSettings.entities);
        console.log(getState().pluginSettings.entities[zoneId]);

        let oldSetting = getState().pluginSettings.entities[zoneId][settingName];

        console.log("ARGS " + settingName + " " + zoneId + " " + value);
        console.log("OLD SETTING " + oldSetting);

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