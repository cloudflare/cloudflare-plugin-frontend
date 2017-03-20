import { pluginSettingsReducer } from '../..//reducers/pluginSettings';
import * as ActionTypes from '../..//constants/ActionTypes';

let initialState = {
  result: [],
  entities: {},
  isFetching: ''
};

describe('Plugin Settings Reducer', () => {
  it('should return the initial state', () => {
    expect(pluginSettingsReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle PLUGIN_SETTINGS_FETCH', () => {
    expect(
      pluginSettingsReducer(initialState, {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH
      })
    ).toEqual({
      result: [],
      entities: {},
      isFetching: 'FETCH ALL PLUGIN SETTINGS'
    });
  });

  it('should handle PLUGIN_SETTINGS_FETCH_SUCCESS ', () => {
    expect(
      pluginSettingsReducer(initialState, {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
        zoneId: 'zoneId',
        setting: [
          {
            id: 'zoneSettingId',
            value: true,
            editable: true,
            modified_on: ''
          }
        ]
      })
    ).toEqual({
      entities: {
        zoneId: {
          zoneSettingId: {
            id: 'zoneSettingId',
            value: true,
            editable: true,
            modified_on: ''
          }
        }
      },
      isFetching: '',
      result: ['zoneSettingId']
    });
  });

  it('should handle PLUGIN_SETTINGS_FETCH_ERROR ', () => {
    expect(
      pluginSettingsReducer(initialState, {
        type: ActionTypes.PLUGIN_SETTINGS_FETCH_ERROR
      })
    ).toEqual(initialState);
  });

  it('should handle PLUGIN_SETTING_UPDATE ', () => {
    expect(
      pluginSettingsReducer({ entities: { zoneId: {} } }, {
        type: ActionTypes.PLUGIN_SETTING_UPDATE,
        zoneId: 'zoneId',
        setting: {
          id: 'settingName',
          value: true,
          editable: true,
          modified_on: ''
        }
      })
    ).toEqual({
      entities: {
        zoneId: {
          settingName: {
            id: 'settingName',
            value: true,
            editable: true,
            modified_on: ''
          }
        }
      },
      isFetching: 'settingName'
    });
  });

  it('should handle pluginUpdateSettingSuccess ', () => {
    expect(
      pluginSettingsReducer({ entities: { zoneId: {} } }, {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_SUCCESS,
        zoneId: 'zoneId',
        setting: {
          id: 'settingName',
          value: true,
          editable: true,
          modified_on: ''
        }
      })
    ).toEqual({
      entities: {
        zoneId: {
          settingName: {
            id: 'settingName',
            value: true,
            editable: true,
            modified_on: ''
          }
        }
      },
      isFetching: ''
    });
  });

  it('should handle PLUGIN_SETTING_UPDATE_ERROR ', () => {
    expect(
      pluginSettingsReducer({ entities: { zoneId: {} } }, {
        type: ActionTypes.PLUGIN_SETTING_UPDATE_ERROR,
        zoneId: 'zoneId',
        setting: {
          id: 'settingName',
          value: true,
          editable: true,
          modified_on: ''
        }
      })
    ).toEqual({
      entities: {
        zoneId: {
          settingName: {
            id: 'settingName',
            value: true,
            editable: true,
            modified_on: ''
          }
        }
      },
      isFetching: ''
    });
  });
});
