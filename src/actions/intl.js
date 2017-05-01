import http from 'cf-util-http';

import * as ActionTypes from '../constants/ActionTypes';
import { applicationInit } from './app';
import { notificationAddError } from './notifications';
import { getConfigValue } from '../selectors/config.js';
import { getLocale } from '../selectors/intl.js';

export function intlFetchTranslations() {
  return {
    type: ActionTypes.INTL_FETCH_TRANSLATIONS
  };
}

export function intlFetchTranslationsSuccess(locale, translations) {
  return {
    type: ActionTypes.INTL_FETCH_TRANSLATIONS_SUCCESS,
    locale,
    translations
  };
}

export function intlFetchTranslationsError(error) {
  return {
    type: ActionTypes.INTL_FETCH_TRANSLATIONS_ERROR,
    error
  };
}

export function asyncIntlFetchTranslations() {
  return (dispatch, getState) => {
    dispatch(intlFetchTranslations());
    let locale = getConfigValue(getState().config, 'locale');
    let currentLocale = getLocale(getState());
    if (typeof locale != 'undefined' && locale != currentLocale) {
      let opts = {};
      opts.headers = { Accept: 'application/javascript' };
      http.get('./lang/' + locale + '.js', opts, function(error, response) {
        if (response) {
          let translations = JSON.parse(response.text);
          dispatch(intlFetchTranslationsSuccess(locale, translations));
          dispatch(applicationInit());
        } else {
          dispatch(notificationAddError(error));
        }
      });
    }
  };
}
