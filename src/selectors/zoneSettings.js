import _ from 'lodash';

export function getZoneSettingsValueForZoneId(zoneId, settingId, state) {
  // return false as default value
  return _.get(
    state,
    ['zoneSettings', 'entities', zoneId, settingId, 'value'],
    false
  );
}

export function getZoneSettingsModifiedDateForZoneId(zoneId, settingId, state) {
  // return '' as default value
  return _.get(
    state,
    ['zoneSettings', 'entities', zoneId, settingId, 'modified_on'],
    ''
  );
}

export function getAllZoneSettingsForZoneId(zoneId, state) {
  return _.get(state, ['entities', zoneId], false);
}
