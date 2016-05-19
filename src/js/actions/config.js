import http from 'cf-util-http';

import * as ActionTypes from '../constants/ActionTypes';
import { asyncIntlFetchTranslations } from './intl';
import { notificationAddError } from './notifications';
import { isLoggedIn, getEmail } from '../utils/Auth/Auth';
import { asyncUserLoginSuccess } from '../actions/user';

const ABSOLUTE_URL_BASE = "absoluteUrlBase";

export function configFetch() {
    return {
        type: ActionTypes.CONFIG_FETCH
    }
}

export function configFetchSuccess(config) {
    return {
        type: ActionTypes.CONFIG_FETCH_SUCCESS,
        config
    }
}

export function configFetchError() {
    return {
        type: ActionTypes.CONFIG_FETCH_ERROR,
    }
}

export function asyncConfigFetch() {
    return dispatch => {
        dispatch(configFetch());

        let opts = {};
        opts.headers = {'Accept': 'text/javascript'};
        http.get('./config.js', opts, function (response) {
                let config = JSON.parse(response.text);
                config = addAbsoluteUrlBase(config);
                dispatch(configFetchSuccess(config));
                dispatch(asyncIntlFetchTranslations(config.locale))
                //log user in if their email is in local storage
                if(isLoggedIn()) {
                    dispatch(asyncUserLoginSuccess(getEmail()));
                }

            },
            function (error) {
                dispatch(configFetchError());
                dispatch(notificationAddError(error));
            });
    }
}

/*
 * Some integrations don't work with relative paths because the URL doesn't match
 * the actual file path, this function allows integrations to configure a base aboslute
 * url path to be used in components/Image. absoluteBaseUrl should be defined globally
 * on the page where the SPA is loaded.
 */
function addAbsoluteUrlBase(config) {
    if(absoluteUrlBase) {
        config[ABSOLUTE_URL_BASE] = absoluteUrlBase;
    } else {
        config[ABSOLUTE_URL_BASE] = "";
    }
    return config;
}