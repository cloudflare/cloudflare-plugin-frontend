import _ from 'lodash';

export function getZoneSettingsValueForZoneId(zoneId, settingId, state) {
	// return false as default value
	return _.get(state, ["zoneSettings", "entities", zoneId, settingId, "value"], false);
}
