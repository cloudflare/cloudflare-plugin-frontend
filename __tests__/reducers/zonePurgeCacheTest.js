
import { zonePurgeCacheReducer } from '../../src/reducers/zonePurgeCache';
import * as ActionTypes from '../../src/constants/ActionTypes';

let initialState = {
  isFetching: false
};

describe('Plugin Settings Reducer', () => {
  it('should return the initial state', () => {
    expect(zonePurgeCacheReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle ZONE_PURGE_CACHE', () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE
      })
    ).toEqual({
      isFetching: true
    });
  });

  it('should handle ZONE_PURGE_CACHE_SUCCESS', () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE_SUCCESS
      })
    ).toEqual({
      isFetching: false
    });
  });

  it('should handle ZONE_PURGE_CACHE_ERROR', () => {
    expect(
      zonePurgeCacheReducer(initialState, {
        type: ActionTypes.ZONE_PURGE_CACHE_ERROR
      })
    ).toEqual({
      isFetching: false
    });
  });
});
