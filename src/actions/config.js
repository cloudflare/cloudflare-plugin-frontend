import http from 'cf-util-http';

import * as ActionTypes from '../constants/ActionTypes';
import { asyncIntlFetchTranslations } from './intl';
import { notificationAddError } from './notifications';
import { isLoggedIn, getEmail } from '../utils/Auth/Auth';
import { asyncUserLoginSuccess } from '../actions/user';
import { ABSOLUTE_URL_BASE_KEY } from '../reducers/config';

export function configFetch() {
  return {
    type: ActionTypes.CONFIG_FETCH
  };
}

export function configFetchSuccess() {
  return {
    type: ActionTypes.CONFIG_FETCH_SUCCESS
  };
}

export function configFetchError() {
  return {
    type: ActionTypes.CONFIG_FETCH_ERROR
  };
}

export function asyncConfigInit() {
  return dispatch => {
    /*
     * 1. Fetch config.js
     * 2. Fetch userConfig.js (which may not exist)
     * 3. Fetch translations with the language from the config. 
     */
    dispatch(asyncConfigFetch());
    if (typeof window.absoluteUrlBase !== 'undefined') {
      /*
       * Some integrations don't work with relative paths because the URL doesn't match
       * the actual file path, this function allows integrations to configure a base absolute
       * url path to be used in components/Image. absoluteBaseUrl should be defined globally
       * on the page where the SPA is loaded.
       */
      dispatch(
        configUpdateByKey(ABSOLUTE_URL_BASE_KEY, window.absoluteUrlBase)
      );
    }
    //log user in if their email is in local storage
    if (isLoggedIn()) {
      dispatch(asyncUserLoginSuccess(getEmail()));
    }
  };
}

export function asyncConfigFetch() {
  return dispatch => {
    dispatch(configFetch());
    let opts = {};
    opts.headers = { Accept: 'application/javascript' };
    let configUrl = './config.js';
    http.get(configUrl, opts, function(error, response) {
      if (response) {
        dispatch(configFetchSuccess());
        try {
          let config = JSON.parse(response.text);
          Object.keys(config).map(function(key) {
            dispatch(configUpdateByKey(key, config[key]));
          });
        } catch (e) {
          dispatch(notificationAddError(e.message + ' ' + configUrl));
        }
        dispatch(asyncUserConfigFetch());
      } else {
        dispatch(configFetchError());
      }
    });
  };
}

export function asyncUserConfigFetch() {
  return dispatch => {
    dispatch(configFetch());
    let opts = {};
    opts.headers = { Accept: 'application/javascript' };
    let configUrl = './userConfig.js';
    http.get(configUrl, opts, function(error, response) {
      if (response) {
        dispatch(configFetchSuccess());
        try {
          let userConfig = JSON.parse(response.text);
          Object.keys(userConfig).map(function(key) {
            dispatch(configUpdateByKey(key, userConfig[key]));
          });
        } catch (e) {
          //do nothing, userConfig.js doesn't exist and thats okay.
        }
      }
      dispatch(asyncIntlFetchTranslations());
    });
  };
}

export function configUpdateByKey(key, value) {
  return {
    type: ActionTypes.CONFIG_UPDATE_BY_KEY,
    key,
    value
  };
}
