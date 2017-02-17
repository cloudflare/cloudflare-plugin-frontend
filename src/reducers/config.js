import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    config: {},
    isFetching: false
};

export const ABSOLUTE_URL_BASE_KEY = 'absoluteUrlBase';

export function configReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CONFIG_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.CONFIG_FETCH_SUCCESS:
            return Object.assign({}, state, {
                config: action.config,
                isFetching: false
            });
        case ActionTypes.CONFIG_FETCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        case ActionTypes.CONFIG_UPDATE_BY_KEY:
            return Object.assign({}, state, {
                    config: Object.assign({}, state.config, {
                        [action.key]: action.value
                    })
                }
            );
        default:
            return state;
    }
}