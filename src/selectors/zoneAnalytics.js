import _ from 'lodash';

export function getZoneAnalyticsForZoneId(zoneId, state) {
  return _.get(state, ['entities', zoneId], false);
}
