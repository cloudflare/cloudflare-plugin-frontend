import { expect } from 'chai';
import { pluginSettingsReducer } from '../../reducers/pluginSettings';
import * as ActionTypes from '../../constants/ActionTypes';
import 'babel-polyfill'; //Object.Assign


let initialState = {
    result: [],
    entities: {},
    isFetching: false,
};

describe('Plugin Settings Reducer', () => {
    it('should return the initial state', () => {
        expect(
            pluginSettingsReducer(initialState, {})
        ).to.eql(initialState)
    })

    it('should handle PLUGIN_SETTINGS_FETCH', () => {
        expect(
            pluginSettingsReducer(initialState, {
                type: ActionTypes.PLUGIN_SETTINGS_FETCH
            })
        ).to.eql({
            result: [],
            entities: {},
            isFetching: true,
        })
    })

    it('should handle PLUGIN_SETTINGS_FETCH_SUCCESS ', () => {
        expect(
            pluginSettingsReducer(initialState, {
                type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
                'zoneId': 'zoneId',
                'setting': [{
                    'id': "zoneSettingId",
                    'value': true,
                    'editable': true,
                    'modified_on': "",
                }]
            })
        ).to.eql({
            'entities': {
                'zoneId': {
                    'zoneSettingId': {
                        'id': "zoneSettingId",
                        'value': true,
                        'editable': true,
                        'modified_on': "",
                    }
                }
            },
            isFetching: false,
            result: [
                'zoneSettingId'
            ]
        })
    })

    it('should handle PLUGIN_SETTINGS_FETCH_ERROR ', () => {
        expect(
            pluginSettingsReducer(initialState, {
                type: ActionTypes.PLUGIN_SETTINGS_FETCH_ERROR,
            })
        ).to.eql(
            initialState
        )
    })

    it('should handle PLUGIN_SETTING_UPDATE ', () => {
        expect(
            pluginSettingsReducer({ 'entities': { 'zoneId': {} } }, {
                type: ActionTypes.PLUGIN_SETTING_UPDATE,
                'zoneId': 'zoneId',
                'setting': {
                    id: "ip_rewrite",
                    value: true,
                    editable: true,
                    modified_on: "",
                }
            })
        ).to.eql({
            entities : {
                'zoneId': {
                    'ip_rewrite': {
                        id: "ip_rewrite",
                        value: true,
                        editable: true,
                        modified_on: "",
                    }
                }
            },
            isFetching: true,
        })
    })

    it('should handle pluginUpdateSettingSuccess ', () => {
        expect(
            pluginSettingsReducer({ 'entities': { 'zoneId': {} } }, {
                type: ActionTypes.PLUGIN_SETTING_UPDATE_SUCCESS,
                'zoneId': 'zoneId',
                'setting': {
                    id: "ip_rewrite",
                    value: true,
                    editable: true,
                    modified_on: "",
                }
            })
        ).to.eql({
            entities : {
                'zoneId': {
                    'ip_rewrite': {
                        id: "ip_rewrite",
                        value: true,
                        editable: true,
                        modified_on: "",
                    }
                }
            },
            isFetching: false,
        })
    })

    it('should handle PLUGIN_SETTING_UPDATE_ERROR ', () => {
        expect(
            pluginSettingsReducer({ 'entities': { 'zoneId': {} } }, {
                type: ActionTypes.PLUGIN_SETTING_UPDATE_ERROR,
                'zoneId': 'zoneId',
                'setting': {
                    id: "ip_rewrite",
                    value: true,
                    editable: true,
                    modified_on: "",
                }
            })
        ).to.eql({
            entities : {
                'zoneId': {
                    'ip_rewrite': {
                        id: "ip_rewrite",
                        value: true,
                        editable: true,
                        modified_on: "",
                    }
                }
            },
            isFetching: false,
        })
    })
})