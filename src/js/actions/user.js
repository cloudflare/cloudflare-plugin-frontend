import { routeActions } from 'redux-simple-router';
import { userAuth, userCreate } from '../utils/CFHostAPI/CFHostAPI';
import { pluginAccountPost, pluginResponseOk } from '../utils/PluginAPI/PluginAPI';
import { notificationAddHostAPIError, notificationAddClientAPIError } from './notifications';
import * as ActionTypes from '../constants/ActionTypes';
import * as UrlPaths from '../constants/UrlPaths';

import { asyncFetchZones } from './zones';

export function userLogin() {
    return {
        type: ActionTypes.USER_LOGIN
    };
}

/*
 * always call asyncUserLoginSuccess instead of userLoginSuccess
 * this is how we trigger GETs that need to occur after a successful login.
 * The user can also be logged in from localStorage automatically when the app loads
 * which is why this logic doens't live in asyncLogin().
 */
export function userLoginSuccess(email) {
    return {
        type: ActionTypes.USER_LOGIN_SUCCESS,
        email
    };
}

export function asyncUserLoginSuccess(email) {
    return dispatch => {
        dispatch(userLoginSuccess(email));
        dispatch(asyncFetchZones());
        dispatch(routeActions.push(UrlPaths.HOME_PAGE));
    };
}


export function userLoginError(error) {
    return {
        type: ActionTypes.USER_LOGIN_ERROR,
        error
    };
}

export function asyncLogin(email, password) {
    return dispatch => {
        dispatch(userLogin());
        userAuth({ cloudflare_email: email, cloudflare_pass: password }, function(error, response) {
            if (response) {
                dispatch(asyncUserLoginSuccess(response.body.response.cloudflare_email));
            } else {
                dispatch(notificationAddHostAPIError(userLoginError(), error));
            }
        });
    };
}

export function asyncAPILogin(email, apiKey) {
    return dispatch => {
        dispatch(userLogin());
        pluginAccountPost(email, apiKey, function(error, response){
            if(pluginResponseOk(response)) {
                dispatch(asyncUserLoginSuccess(email));
            } else {
                dispatch(userLoginError());
                dispatch(notificationAddClientAPIError(userLoginError(), response));
            }
        });
    };
}

export function userLogout() {
    return {
        type: ActionTypes.USER_LOGOUT
    };
}

export function userSignup() {
    return {
        type: ActionTypes.USER_SIGNUP
    };
}

export function userSignupSuccess() {
    return {
        type: ActionTypes.USER_SIGNUP_SUCCESS,
    };
}

export function userSignupError() {
    return {
        type: ActionTypes.USER_SIGNUP_ERROR
    };
}

export function asyncUserSignup(email, password) {
    return dispatch => {
        dispatch(userSignup());
        userCreate({ cloudflare_email: email, cloudflare_pass: password }, function(error, response) {
            if(response) {
                dispatch(userSignupSuccess());
                dispatch(asyncLogin(email, password));
            } else {
                dispatch(notificationAddHostAPIError(userSignupError(), error));
            }
        });


    };
}



