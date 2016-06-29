import { zonePurgeCache as v4ZonePurgeCache, v4ResponseOk } from '../utils/CFClientV4API/CFClientV4API';
import { notificationAddClientAPIError, notificationAddSuccess } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';

export function zonePurgeCache() {
    return {
        type: ActionTypes.ZONE_PURGE_CACHE
    }
}

export function zonePurgeCacheSuccess() {
    return {
        type: ActionTypes.ZONE_PURGE_CACHE_SUCCESS
    }
}

export function zonePurgeCacheError() {
    return {
        type: ActionTypes.ZONE_PURGE_CACHE_ERROR
    }
}

export function asyncZonePurgeCacheIndividualFiles(zoneId, files) {
    return dispatch => {
        dispatch(zonePurgeCache());

        var formatedFiles = files.replace(/^\s+|\s+$/g,'').split(/\s+/);

        v4ZonePurgeCache({zoneId: zoneId, files: formatedFiles}, function(response){
            if(v4ResponseOk(response)) {
                dispatch(zonePurgeCacheSuccess());
                dispatch(notificationAddSuccess("container.purgeCacheCard.success", true));
            } else {
                dispatch(notificationAddClientAPIError(zonePurgeCacheError(), response));
            }
        }, function(error){
            dispatch(notificationAddClientAPIError(zonePurgeCacheError(), error));
        });
    }
}

export function asyncZonePurgeCacheEverything(zoneId) {
    return dispatch => {
        dispatch(zonePurgeCache());
        v4ZonePurgeCache({zoneId: zoneId, purge_everything: true}, function(response){
            if(v4ResponseOk(response)) {
                dispatch(zonePurgeCacheSuccess());
                dispatch(notificationAddSuccess("container.purgeCacheCard.success", true));
            } else {
                dispatch(notificationAddClientAPIError(zonePurgeCacheError(), response));
            }
        }, function(error){
            dispatch(notificationAddClientAPIError(zonePurgeCacheError(), error));
        });
    }
}