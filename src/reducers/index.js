import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { activeZoneReducer } from './activeZone';
import { appReducer } from './app';
import { configReducer } from './config';
import { dnsRecordsReducer } from './zoneDnsRecords.js';
import { intlReducer } from './intl';
import { notificationsReducer } from './notifications';
import { userReducer } from './user';
import { zonePurgeCacheReducer } from './zonePurgeCache';
import { zoneEntitlementsReducer } from './zoneEntitlements';
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
  zoneDnsRecords: dnsRecordsReducer,
  zonePurgeCache: zonePurgeCacheReducer,
  zoneSettings: zoneSettingsReducer,
  pluginSettings: pluginSettingsReducer,
  zoneEntitlements: zoneEntitlementsReducer
});

export default rootReducer;
