
import { configReducer } from '../../src/reducers/config';
import * as ActionTypes from '../../src/constants/ActionTypes';

describe('Config Reducer', () => {
  it('should return the initial state', () => {
    expect(configReducer(undefined, {})).toEqual({
      config: {},
      isFetching: false
    });
  });

  it('should handle CONFIG_FETCH', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH
      })
    ).toEqual({
      config: {},
      isFetching: true
    });
  });

  it('should handle CONFIG_FETCH_SUCCESS', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH_SUCCESS,
        config: { key: 'value' }
      })
    ).toEqual({
      config: { key: 'value' },
      isFetching: false
    });
  });

  it('should handle CONFIG_FETCH_ERROR', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH_ERROR
      })
    ).toEqual({
      config: {},
      isFetching: false
    });
  });

  it('should handle CONFIG_UPDATE_BY_KEY', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_UPDATE_BY_KEY,
        key: 'key',
        value: 'value'
      })
    ).toEqual({
      config: { key: 'value' },
      isFetching: false
    });
  });
});
