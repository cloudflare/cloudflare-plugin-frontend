import http from 'cf-util-http';
import { v4ResponseOk } from '../../utils/CFClientV4API/CFClientV4API';

/*
 * This endpoint isn't real but we'll use it to identify REST calls for
 * plugin specific functionality like saving a v4 API key/email or toggling
 * admin settings.  The structure of this API's responses will mimic the client V4 API.
 */
const ENDPOINT = 'https://partners.cloudflare/plugins';

/*
 * Indicates api call success
 *
 * @param {Object} [response]
 *
 * @returns {Boolean} Successful
 */
export function pluginResponseOk(response) {
    return v4ResponseOk(response);
}

export function pluginAccountPost(email, apiKey, onSuccess, onError) {
    let opts = {
        body: {
            email: email,
            apiKey: apiKey
        }
    };
    return http.post(ENDPOINT + '/account/', opts, onSuccess, onError);
}

export function pluginSettingListGet(zoneId, onSuccess, onError) {
    let opts = {};

    return http.get(ENDPOINT + '/plugin/' + zoneId['zoneId'] + '/settings/', opts, onSuccess, onError);
}

export function pluginSettingPatch(zoneId, settingName, value, onSuccess, onError) {
    let opts = {
        body: {
            value: value
        }
    };

    return http.patch(ENDPOINT + '/plugin/' + zoneId + '/settings/' + settingName, opts, onSuccess, onError);
}
