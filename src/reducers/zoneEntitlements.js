import * as ActionTypes from '../constants/ActionTypes';
import { normalizeZoneEntitlements } from '../constants/Schemas';

const initialState = {
  entities: {},
  isFetching: false
};

export function zoneEntitlementsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ZONE_ENTITLEMENTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ActionTypes.ZONE_ENTITLEMENTS_SUCCESS:
      let normalizedZoneRailguns = normalizeZoneEntitlements(
        action.zoneEntitlements
      );
      let newEntities = Object.assign({}, state.entities);
      newEntities[action.zoneId] = normalizedZoneRailguns.entities.entitlements;

      return Object.assign({}, state, {
        entities: newEntities,
        isFetching: false
      });
    case ActionTypes.ZONE_ENTITLEMENTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
