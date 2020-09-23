import http from 'cf-util-http';

const ENDPOINT = 'https://api.cloudflare.com/host-gw.html';

let hostKey = '';

export function setHostKey(hostKey) {
  this.hostKey = hostKey;
}

/*
 * Indicates api call success
 *
 * @param {Object} [response]
 *
 * @returns {Boolean} Successful
 */
export function hostAPIResponseOk(response) {
  return !(response.body.result === 'error');
}

/*
 * Response body for errors and success responses is
 * occasionally returned in response.text instead of
 * response.body.
 *
 * @param {Function} callback
 *
 * @returns {Function} callback that passes correct error
 */
export function hostCallback(callback) {
  return function(error, response) {
    if (response && response.text) {
      response.body = JSON.parse(response.text);
    }
    if (error && error.text) {
      error.body = JSON.parse(error.text);
    }
    //return business logic errors as errors
    if (response && !hostAPIResponseOk(response)) {
      error = response;
      response = null;
    }
    return callback(error, response);
  };
}

/*
 * Create a user
 *
 * @param {Object} [opts]
 * @param {String} [opts.cloudflare_email]
 * @param {String} [opts.cloudflare_pass]
 * @param {String} [opts.cloudflare_username]
 * @param {String} [opts.unique_id]
 * @param {String} [opts.clobber_unique_id]
 * @param {Function} [onSuccess]
 * @param {Function} [onError]
 *
 * @returns {Object} API Response
 */
export function userCreate(
  {
    cloudflare_email,
    cloudflare_pass,
    cloudflare_username,
    unique_id,
    clobber_unique_id
  },
  callback
) {
  let opts = {
    body: {
      act: 'user_create',
      cloudflare_email: cloudflare_email.toString().trim(),
      cloudflare_pass: cloudflare_pass.toString().trim()
    }
  };

  if (cloudflare_username) {
    opts.body.cloudflare_username = cloudflare_username;
  }
  if (unique_id) {
    opts.body.unique_id = unique_id;
  }
  if (clobber_unique_id) {
    opts.body.clobber_unique_id = clobber_unique_id;
  }

  return send('POST', opts, callback);
}

/*
 * Authenticate the user
 *
 * @param {Object} [opts]
 * @param {String} [opts.cloudflare_email]
 * @param {String} [opts.cloudflare_pass]
 * @param {String} [opts.unique_id]
 * @param {String} [opts.clobber_unique_id]
 * @param {Function} [onSuccess]
 * @param {Function} [onError]
 *
 * @returns {Object} API Response
 */
export function userAuth(
  { cloudflare_email, cloudflare_pass, unique_id, clobber_unique_id },
  callback
) {
  let opts = {
    body: {
      act: 'user_auth',
      cloudflare_email: cloudflare_email,
      cloudflare_pass: cloudflare_pass
    }
  };

  if (unique_id) {
    opts.body.unique_id = unique_id;
  }
  if (clobber_unique_id) {
    opts.body.clobber_unique_id = clobber_unique_id;
  }

  return send('POST', opts, callback);
}

/*
 * Provision partial zone set with CNAME
 *
 * @param {Object} [opts]
 * @param {String} [opts.user_key]
 * @param {String} [opts.zone_name]
 * @param {String} [opts.resolve_to]
 * @param {String} [opts.subdomains]
 * @param {Function} [onSuccess]
 * @param {Function} [onError]
 *
 * @returns {Object} API Response
 */
export function partialZoneSet(
  { user_key, zone_name, resolve_to, subdomains },
  callback
) {
  let opts = {
    body: {
      act: 'zone_set',
      user_key: user_key,
      zone_name: zone_name,
      resolve_to: resolve_to,
      subdomains: subdomains
    }
  };
  return send('POST', opts, callback);
}

/*
 * Provision full zone setup for a domain
 *
 * @param {Object} [opts]
 * @param {String} [opts.user_key]
 * @param {String} [opts.zone_name]
 * @param {Function} [onSuccess]
 * @param {Function} [onError]
 *
 * @returns {Object} API Response
 */
export function fullZoneSet({ user_key, zone_name }, callback) {
  let opts = {
    body: {
      act: 'full_zone_set',
      user_key: user_key,
      zone_name: zone_name
    }
  };

  return send('POST', opts, callback);
}

function send(method, opts, callback) {
  if (method.toUpperCase() === 'GET') {
    opts.parameters.host_key = hostKey;
  } else {
    opts.body.host_key = hostKey;
  }
  return http.request(method, ENDPOINT, opts, hostCallback(callback));
}
