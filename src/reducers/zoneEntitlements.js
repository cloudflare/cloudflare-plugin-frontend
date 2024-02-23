import * as ActionTypes from '../constants/ActionTypes';

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
      let newEntities = Object.assign({}, state.entities);
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
