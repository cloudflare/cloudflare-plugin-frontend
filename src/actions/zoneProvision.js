import {
  zoneGetAll,
  zoneActivationCheckPutNew
} from '../utils/CFClientV4API/CFClientV4API';
import { partialZoneSet, fullZoneSet } from '../utils/CFHostAPI/CFHostAPI';
import {
  notificationAddSuccess,
  notificationAddError,
  notificationAddHostAPIError,
  notificationAddClientAPIError
} from './notifications';
import * as ActionTypes from '../constants/ActionTypes';
import { asyncZoneSetActiveZone } from './activeZone';
import { normalizeZoneGetAll } from '../constants/Schemas';
import { zoneFetch, zoneFetchSuccess } from './zones';

/*
 * Zone Provision actions still use reducers/zones.js as the reducer
 */

export function zoneActivationCheck() {
  return {
    type: ActionTypes.ZONE_ACTIVATION_CHECK
  };
}

export function zoneActivationCheckSuccess() {
  return {
    type: ActionTypes.ZONE_ACTIVATION_CHECK_SUCCESS
  };
}

export function zoneActivationCheckError() {
  return {
    type: ActionTypes.ZONE_ACTIVATION_CHECK_ERROR
  };
}

export function asyncZoneActivationCheck(zoneId) {
  return dispatch => {
    dispatch(zoneActivationCheck());
    zoneActivationCheckPutNew(zoneId, function(error, response) {
      if (response) {
        dispatch(zoneActivationCheckSuccess());
        dispatch(
          notificationAddSuccess('container.activationCheckCard.success', true)
        );
      } else {
        dispatch(
          notificationAddClientAPIError(zoneActivationCheckError(), error)
        );
      }
    });
  };
}

export function zonesProvisionCname() {
  return {
    type: ActionTypes.ZONES_PROVISION_CNAME
  };
}

export function zoneProvisionCnameSuccess() {
  return {
    type: ActionTypes.ZONES_PROVISION_CNAME_SUCCESS
  };
}

export function zoneProvisionCnameError() {
  return {
    type: ActionTypes.ZONES_PROVISION_CNAME_ERROR
  };
}

export function asyncZoneProvisionCname(domainName) {
  return dispatch => {
    dispatch(zonesProvisionCname());

    partialZoneSet({ zone_name: domainName }, function(error, response) {
      if (response) {
        dispatch(zoneProvisionCnameSuccess());
        dispatch(asyncSetHostAPIProvisionedDomainActive(domainName));
      } else {
        dispatch(notificationAddHostAPIError(zoneProvisionCnameError(), error));
      } // zoneProvision business logic error
    });
  }; // end thunk dispatch
}

export function zoneProvisionFull() {
  return {
    type: ActionTypes.ZONES_PROVISION_FULL
  };
}

export function zoneProvisionFullSuccess() {
  return {
    type: ActionTypes.ZONES_PROVISION_FULL_SUCCESS
  };
}

export function zoneProvisionFullError() {
  return {
    type: ActionTypes.ZONES_PROVISION_FULL_ERROR
  };
}

export function asyncZoneProvisionFull(domainName) {
  return dispatch => {
    dispatch(zoneProvisionFull());
    fullZoneSet({ zone_name: domainName }, function(error, response) {
      if (response) {
        dispatch(zoneProvisionFullSuccess());
        dispatch(asyncSetHostAPIProvisionedDomainActive(domainName));
      } else {
        dispatch(notificationAddHostAPIError(zoneProvisionFullError(), error));
      }
    }); //end fullZoneSet
  };
}

/*
 * This copy is a slightly modified copy actions/zones.js -> asyncFetchZones()
 *
 * The host API doesn't return the zoneId so we need to:
 * 1. zoneGetAll() to get a list of zones
 * 2. Get the zone object for the zone we just provisioned
 * 3. Call asyncSetActiveZone() with the new zone object that now contains the zoneId
 *
 * asyncSetActiveZone() will fetch all the zone specific info the app depends on but only
 * if zone.id is set.
 */
function asyncSetHostAPIProvisionedDomainActive(domainName) {
  return dispatch => {
    dispatch(zoneFetch());
    zoneGetAll(function(error, response) {
      if (response) {
        dispatch(zoneFetchSuccess(response.body.result));
        let normalizedZoneList = normalizeZoneGetAll(response.body.result);
        dispatch(
          asyncZoneSetActiveZone(normalizedZoneList.entities.zones[domainName])
        );
      } else {
        dispatch(notificationAddError(error));
      }
    });
  };
}
