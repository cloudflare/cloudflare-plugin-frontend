import { zoneGetEntitlements } from '../utils/CFClientV4API/CFClientV4API';
import { notificationAddClientAPIError } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function zoneEntitlements() {
  return {
    type: ActionTypes.ZONE_ENTITLEMENTS
  };
}

export function zoneEntitlementsSuccess(zoneId, zoneEntitlements) {
  return {
    type: ActionTypes.ZONE_ENTITLEMENTS_SUCCESS,
    zoneId,
    zoneEntitlements
  };
}

export function zoneEntitlementsError() {
  return {
    type: ActionTypes.ZONE_ENTITLEMENTS_ERROR
  };
}

export function asyncZoneEntitlements(zoneId) {
  return dispatch => {
    dispatch(zoneEntitlements());
    zoneGetEntitlements(zoneId, function(error, response) {
      if (response) {
        dispatch(zoneEntitlementsSuccess(zoneId, response.body.result));
      } else {
        dispatch(notificationAddClientAPIError(zoneEntitlementsError(), error));
      }
    });
  };
}
