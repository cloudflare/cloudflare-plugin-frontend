import { ABSOLUTE_URL_BASE_KEY } from '../reducers/config';

export function getAbsoluteUrl(config, url) {
    let baseUrl = (typeof config.config[ABSOLUTE_URL_BASE_KEY] !== 'undefined' ? config.config[ABSOLUTE_URL_BASE_KEY] : "");
    return baseUrl + url;
}