import { activeZoneReducer } from '../..//reducers/activeZone';
import * as ActionTypes from '../..//constants/ActionTypes';

describe('Active Zone Reducer', () => {
  it('should return the initial state', () => {
    expect(activeZoneReducer(undefined, {})).toEqual({
      id: '',
      name: ''
    });
  });

  it('should set active zone', () => {
    expect(
      activeZoneReducer(
        {},
        {
          type: ActionTypes.ZONES_SET_ACTIVE_ZONE,
          zone: { id: 1, name: 'name' }
        }
      )
    ).toEqual({
      id: 1,
      name: 'name'
    });
  });
});
