import _ from 'lodash';
import * as ActionTypes from '../constants/ActionTypes';
import { normalizeZoneByIdGetAll } from '../constants/Schemas';

const initialState = {
    entities: {},
    result: [],
    isFetching: false
};


export function pluginSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.PLUGIN_SETTINGS_FETCH:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS:
            let normalizedPluginSettings = normalizeZoneByIdGetAll(action.zoneId, action.setting);

            return Object.assign({}, state, {
                entities: _.merge(state.entities, normalizedPluginSettings.entities),
                result: _.merge(state.result, normalizedPluginSettings.result),
                isFetching: false
            })
        case ActionTypes.PLUGIN_SETTINGS_FETCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            })
        case ActionTypes.PLUGIN_SETTING_UPDATE:
            return Object.assign({}, state, {
                entities: pluginPatchSetting(action.zoneId, action.setting, state),
                isFetching: true
            })
        case ActionTypes.PLUGIN_SETTING_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                entities: pluginPatchSetting(action.zoneId, action.setting, state),
                isFetching: false
            })
        case ActionTypes.PLUGIN_SETTING_UPDATE_ERROR:
            return Object.assign({}, state, {
                entities: pluginPatchSetting(action.zoneId, action.setting, state),
                isFetching: false
            })
        default:
            return state;
    }
}

function pluginPatchSetting(zoneId, setting, state) {
    let patchedEntities = Object.assign({}, state.entities);
    patchedEntities[zoneId][setting.id] = setting;
    return patchedEntities;
}
