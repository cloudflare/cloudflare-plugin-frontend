import {
  zoneGetSettings,
  zonePatchSetting
} from "../utils/CFClientV4API/CFClientV4API";
import {
  notificationAddClientAPIError,
  notificationHandleDevelopmentMode
} from "./notifications";
import * as ActionTypes from "../constants/ActionTypes";

export function zoneFetchSettings() {
  return {
    type: ActionTypes.ZONE_FETCH_SETTINGS
  };
}

export function zoneFetchSettingsSuccess(zoneId, zoneSettings) {
  return {
    type: ActionTypes.ZONE_FETCH_SETTINGS_SUCCESS,
    zoneId,
    zoneSettings
  };
}

export function zoneFetchSettingsError() {
  return {
    type: ActionTypes.ZONE_FETCH_SETTINGS_ERROR
  };
}

export function asyncZoneFetchSettings(zoneId) {
  return dispatch => {
    dispatch(zoneFetchSettings());
    zoneGetSettings(zoneId, function(error, response) {
      if (response) {
        dispatch(zoneFetchSettingsSuccess(zoneId, response.body.result));

        // Lastly check if development mode value and add/remove notification
        dispatch(notificationHandleDevelopmentMode(zoneId));
      } else {
        dispatch(
          notificationAddClientAPIError(zoneFetchSettingsError(), error)
        );
      }
    });
  };
}

export function zoneUpdateSetting(zoneId, setting) {
  return {
    type: ActionTypes.ZONE_UPDATE_SETTING,
    zoneId,
    setting
  };
}

export function zoneUpdateSettingSuccess(zoneId, setting) {
  return {
    type: ActionTypes.ZONE_UPDATE_SETTING_SUCCESS,
    zoneId,
    setting
  };
}

export function zoneUpdateSettingError(zoneId, setting) {
  return {
    type: ActionTypes.ZONE_UPDATE_SETTING_ERROR,
    zoneId,
    setting
  };
}

export function asyncZoneUpdateSetting(settingName, zoneId, value) {
  return (dispatch, getState) => {
    let oldSetting = getState().zoneSettings.entities[zoneId][settingName];

    dispatch(zoneUpdateSetting(zoneId, { id: settingName, value: value }));
    zonePatchSetting(settingName, zoneId, value, function(error, response) {
      if (response) {
        dispatch(zoneUpdateSettingSuccess(zoneId, response.body.result));

        // Lastly check if development mode value and add/remove notification
        dispatch(notificationHandleDevelopmentMode(zoneId));
      } else {
        dispatch(
          notificationAddClientAPIError(
            zoneUpdateSettingError(zoneId, oldSetting),
            error
          )
        );
      }
    });
  };
}
