import * as ActionTypes from "../constants/ActionTypes";
import { asyncDNSRecordFetchList } from "./zoneDnsRecords";
import { asyncZoneFetchAnalytics } from "./zoneAnalytics";
import { asyncZoneRailgunFetchAll } from "./zoneRailgun";
import { asyncZoneFetchSettings } from "./zoneSettings";
import { asyncPluginFetchSettings } from "./pluginSettings";

export function zoneSetActiveZone(zone) {
  return {
    type: ActionTypes.ZONES_SET_ACTIVE_ZONE,
    zone
  };
}

export function asyncZoneSetActiveZone(zone) {
  return dispatch => {
    dispatch(zoneSetActiveZone(zone));
    if (typeof zone.id !== "undefined") {
      dispatch(asyncDNSRecordFetchList(zone.id));
      dispatch(asyncZoneRailgunFetchAll(zone.id));
      dispatch(asyncPluginFetchSettings(zone.id));
      dispatch(asyncZoneFetchSettings(zone.id));
      dispatch(asyncZoneFetchAnalytics(zone.id));
    }
  };
}

export function zoneSetActiveZoneIfEmpty(zone) {
  return (dispatch, getState) => {
    if (getState().activeZone.name === "") {
      dispatch(asyncZoneSetActiveZone(zone));
    }
  };
}
