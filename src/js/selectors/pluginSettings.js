import _ from 'lodash';

export function getPluginSettingsForZoneId(zoneId, state) {
    return _.get(state, ["pluginSettings", "entities", zoneId]);
}

export function getPluginSettingsIsFetching(state) {
    return _.get(state, ["pluginSettings", "isFetching"]);
}

export function getPluginSettingsValueForZoneId(zoneId, settingId, state) {
    // return false as default value
    return _.get(state, ["pluginSettings", "entities", zoneId, settingId, "value"], false);
}

export function getPluginSettingsModifiedDateForZoneId(zoneId, settingId, state) {
    // return '' as default value
    return _.get(state, ["pluginSettings", "entities", zoneId, settingId, "modified_on"], '');
}