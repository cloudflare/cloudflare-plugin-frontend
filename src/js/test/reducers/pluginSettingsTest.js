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

    // var zoneId = "zoneId";

    // let reducedEntities = {
    //     zoneId: {
    //         ip_rewrite: {
    //             id: "ip_rewrite",
    //             value: true,
    //             editable: true,
    //             modified_on: ""
    //         }
    //     }, 
    //     result: {"id":"zoneId"}
    // };

    // var setting = {
    //     id: {"id":"zoneId"}
    // };

    // "zoneId":"zoneId","setting":{"id":"zoneId"}

    // {"entities":
    //     {"1eb2d805b1eabef7a1fca14778ebcac7":
    //         {"ip_rewrite":
    //             {
    //             "id":"ip_rewrite",
    //             "value":true,
    //             "editable":true,
    //             "modified_on":""
    //         }
    //     }
    // }
    // ,"result":["ip_rewrite"]}

    it('should return the initial state', () => {
        expect(
            pluginSettingsReducer(initialState, {})
        ).to.eql({
            entities: {},
            result: [],
            isFetching: false
        })
    })

    it('should handle PLUGIN_SETTINGS_FETCH', () => {
        expect(
            pluginSettingsReducer(initialState, {
                type: ActionTypes.PLUGIN_SETTINGS_FETCH
            })
        ).to.eql({
                entities: {},
                isFetching: true,
                result: [],
            })
    })

    it('should handle PLUGIN_SETTINGS_FETCH_SUCCESS ', () => {
        expect(
            pluginSettingsReducer(initialState, {
                type: ActionTypes.PLUGIN_SETTINGS_FETCH_SUCCESS,
                'zoneId': 'zoneId',
                'setting': {
                    id: "ip_rewrite",
                    value: true,
                    editable: true,
                    modified_on: "",
                }
            })
        ).to.eql(initialState)
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