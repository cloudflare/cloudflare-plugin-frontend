import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { activeZoneReducer } from './activeZone';
import { appReducer } from './app';
import { configReducer } from './config';
import { dnsRecordsReducer } from './zoneDnsRecords.js';
import { intlReducer } from './intl';
import { notificationsReducer } from './notifications';
import { userReducer } from './user';
import { zoneAnalyticsReducer } from './zoneAnalytics';
import { zonePurgeCacheReducer } from './zonePurgeCache';
import { zoneRailgunReducer } from './zoneRailgun';
import { zoneSettingsReducer } from './zoneSettings';
import { zonesReducer } from './zones';
import { pluginSettingsReducer } from './pluginSettings';

const rootReducer = combineReducers({
  activeZone: activeZoneReducer,
  app: appReducer,
  config: configReducer,
  intl: intlReducer,
  user: userReducer,
  notifications: notificationsReducer,
  routing: routerReducer,
  zones: zonesReducer,
  zoneAnalytics: zoneAnalyticsReducer,
  zoneDnsRecords: dnsRecordsReducer,
  zonePurgeCache: zonePurgeCacheReducer,
  zoneRailguns: zoneRailgunReducer,
  zoneSettings: zoneSettingsReducer,
  pluginSettings: pluginSettingsReducer
});

export default rootReducer;
