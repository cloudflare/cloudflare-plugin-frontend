import { expect } from 'chai';
import { configReducer } from '../../reducers/config';
import * as ActionTypes from '../../constants/ActionTypes';
import 'babel-polyfill'; //Object.Assign

describe('Config Reducer', () => {
    it('should return the initial state', () => {
        expect(
            configReducer(undefined, {})
        ).to.eql({
                config: {},
                isFetching: false
            })
    })

    it('should handle CONFIG_FETCH', () => {
        expect(
            configReducer(undefined, {
                type: ActionTypes.CONFIG_FETCH
            })
        ).to.eql({
                config: {},
                isFetching: true
            }
        )
    })

    it('should handle CONFIG_FETCH_SUCCESS', () => {
        expect(
            configReducer(undefined, {
                type: ActionTypes.CONFIG_FETCH_SUCCESS,
                config: {"key": "value"}
            })
        ).to.eql({
                config: {"key": "value"},
                isFetching: false
            }
        )
    })

    it('should handle CONFIG_FETCH_ERROR', () => {
        expect(
            configReducer(undefined, {
                type: ActionTypes.CONFIG_FETCH_ERROR
            })
        ).to.eql({
                config: {},
                isFetching: false
            }
        )
    })

    it('should handle CONFIG_UPDATE_BY_KEY', () => {
        expect(
            configReducer(undefined, {
                type: ActionTypes.CONFIG_UPDATE_BY_KEY,
                key: "key",
                value: "value"
            })
        ).to.eql({
                config: {"key": "value"},
                isFetching: false
            }
        )
    })
})