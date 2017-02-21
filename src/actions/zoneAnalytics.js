import {
  zoneAnalyticsDashboardGet
} from "../utils/CFClientV4API/CFClientV4API";
import { notificationAddClientAPIError } from "./notifications";
import * as ActionTypes from "../constants/ActionTypes";

export function zoneFetchAnalytics() {
  return {
    type: ActionTypes.ZONE_FETCH_ANALYTICS
  };
}

export function zoneFetchAnalyticsSuccess(zoneId, zoneAnalytics) {
  return {
    type: ActionTypes.ZONE_FETCH_ANALYTICS_SUCCESS,
    zoneId,
    zoneAnalytics
  };
}

export function zoneFetchAnalyticsError() {
  return {
    type: ActionTypes.ZONE_FETCH_ANALYTICS_ERROR
  };
}

export function asyncZoneFetchAnalytics(zoneId) {
  return dispatch => {
    dispatch(zoneFetchAnalytics());
    zoneAnalyticsDashboardGet({ zoneId: zoneId, since: -43200 }, function(
      error,
      response
    ) {
      if (response) {
        dispatch(zoneFetchAnalyticsSuccess(zoneId, response.body.result));
      } else {
        dispatch(
          notificationAddClientAPIError(zoneFetchAnalyticsError(), error)
        );
      }
    });
  };
}
