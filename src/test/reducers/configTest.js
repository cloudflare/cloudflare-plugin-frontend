import { configReducer } from '../..//reducers/config';
import * as ActionTypes from '../..//constants/ActionTypes';

describe('Config Reducer', () => {
  it('should return the initial state', () => {
    expect(configReducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle CONFIG_FETCH', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH
      })
    ).toMatchSnapshot();
  });

  it('should handle CONFIG_FETCH_SUCCESS', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH_SUCCESS
      })
    ).toMatchSnapshot();
  });

  it('should handle CONFIG_FETCH_ERROR', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_FETCH_ERROR
      })
    ).toMatchSnapshot();
  });

  it('should handle CONFIG_UPDATE_BY_KEY', () => {
    expect(
      configReducer(undefined, {
        type: ActionTypes.CONFIG_UPDATE_BY_KEY,
        key: 'key',
        value: 'value'
      })
    ).toMatchSnapshot();
  });
});
