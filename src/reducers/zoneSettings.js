import _ from "lodash";
import * as ActionTypes from "../constants/ActionTypes";
import { normalizeZoneByIdGetAll } from "../constants/Schemas";

const initialState = {
  entities: {},
  result: [],
  isFetching: ""
};

export function zoneSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ZONE_FETCH_SETTINGS:
      return Object.assign({}, state, {
        isFetching: "fetchAllSettings"
      });
    case ActionTypes.ZONE_FETCH_SETTINGS_SUCCESS:
      let normalizedZoneSettings = normalizeZoneByIdGetAll(
        action.zoneId,
        action.zoneSettings
      );

      return Object.assign({}, state, {
        entities: _.merge(state.entities, normalizedZoneSettings.entities),
        result: _.merge(state.result, normalizedZoneSettings.result),
        isFetching: ""
      });
    case ActionTypes.ZONE_FETCH_SETTINGS_ERROR:
      return Object.assign({}, state, {
        isFetching: ""
      });
    case ActionTypes.ZONE_UPDATE_SETTING:
      return Object.assign({}, state, {
        entities: zonePatchSetting(action.zoneId, action.setting, state),
        isFetching: action.setting.id
      });
    case ActionTypes.ZONE_UPDATE_SETTING_SUCCESS:
      return Object.assign({}, state, {
        entities: zonePatchSetting(action.zoneId, action.setting, state),
        isFetching: ""
      });
    case ActionTypes.ZONE_UPDATE_SETTING_ERROR:
      return Object.assign({}, state, {
        entities: zonePatchSetting(action.zoneId, action.setting, state),
        isFetching: ""
      });
    default:
      return state;
  }
}

function zonePatchSetting(zoneId, setting, state) {
  let patchedEntities = Object.assign({}, state.entities);
  patchedEntities[zoneId][setting.id] = setting;
  return patchedEntities;
}
