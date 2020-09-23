import { zonePurgeCache as v4ZonePurgeCache } from '../utils/CFClientV4API/CFClientV4API';
import {
  notificationAddClientAPIError,
  notificationAddSuccess
} from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function zonePurgeCache() {
  return {
    type: ActionTypes.ZONE_PURGE_CACHE
  };
}

export function zonePurgeCacheSuccess() {
  return {
    type: ActionTypes.ZONE_PURGE_CACHE_SUCCESS
  };
}

export function zonePurgeCacheError() {
  return {
    type: ActionTypes.ZONE_PURGE_CACHE_ERROR
  };
}

export function asyncZonePurgeCacheIndividualFiles(zoneId, files) {
  return dispatch => {
    dispatch(zonePurgeCache());

    // Get an unstructured string like "     \nhttp://example.com\n\n  \n  http://example.com/hey \n "
    // Return ["http://example.com", "http://example.com/hey"]
    var formatedFiles = files.replace(/^\s+|\s+$/g, '').split(/\s+/);

    v4ZonePurgeCache({ zoneId: zoneId, files: formatedFiles }, function(
      error,
      response
    ) {
      if (response) {
        dispatch(zonePurgeCacheSuccess());
        dispatch(
          notificationAddSuccess('container.purgeCacheCard.success', true)
        );
      } else {
        dispatch(notificationAddClientAPIError(zonePurgeCacheError(), error));
      }
    });
  };
}

export function asyncZonePurgeCacheEverything(zoneId) {
  return dispatch => {
    dispatch(zonePurgeCache());
    v4ZonePurgeCache({ zoneId: zoneId, purge_everything: true }, function(
      error,
      response
    ) {
      if (response) {
        dispatch(zonePurgeCacheSuccess());
        dispatch(
          notificationAddSuccess('container.purgeCacheByURLCard.success', true)
        );
      } else {
        dispatch(notificationAddClientAPIError(zonePurgeCacheError(), error));
      }
    });
  };
}
