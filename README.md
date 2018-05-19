# Build using [Yarn](https://yarnpkg.com/en/docs/install)
1. `yarn install`
2. `yarn run build`

# Development Tasks
```
$ yarn run build
$ yarn run build:production
$ yarn run lint
$ yarn run format
$ yarn run test
```

# Production
For production run `yarn run build:production` to get a minified version of compiled.min.js

# Building Your Own Backend
This repository serves as the front end for all of our 3rd party integrations.
It is intended to be backend agnostic with the intention of making it as easy as
possible to port it to new backends.  If you would like to build a custom backend
just follow these steps:

1. Implement RestProxyCallback()
```
    /*
     * A callback for cf-util-http to proxy all calls to our backend
     *
     * @param {Object} [opts]
     * @param {String} [opts.method] - GET/POST/PUT/PATCH/DELETE
     * @param {String} [opts.url]
     * @param {Object} [opts.parameters]
     * @param {Object} [opts.headers]
     * @param {Object} [opts.body]
     * @param {Function} [opts.onSuccess]
     * @param {Function} [opts.onError]
     */
     function RestProxyCallback(opts) {}
```
This method is called on every request before it is sent. It should route all
absolute URLs to the endpoint for your backend. Requests with
relative URLs for things like localization (./lang/*.js) and
config (./config.json) should remain unchanged.

2. Build your backend data store
Your backend needs to store the following information about each user:
    * Cloudflare [Client V4 API](https://api.cloudflare.com/) Key
    * Cloudflare Client V4 API Email
    * Cloudflare [Host API](https://www.cloudflare.com/docs/host-api.html) Key

3. In `index.html` create a variable in local storage called `cfEmail` which contains
Cloudflare Client V4 API Email of the current user.

4. Build an API Client for the Cloudflare V4 API which adds the necessary headers
to each request.

5. Build an API Client for the Cloudflare Host API which adds the Host Key to all requests.

## JSON response for endpoint /config 

```
{
    "debug": false,
    "featureManagerIsFullZoneProvisioningEnabled": false,
    "isDNSPageEnabled": true,
    "isSubdomainCheckEnabled": true,
    "homePageCards": [
        "ApplyDefaultSettingsCard",
        "AutomaticHTTPSRewritesCard",
        "IpRewriteCard",
        "PluginSpecificCacheCard",
        "PluginSpecificCacheTagCard"
    ],
    "moreSettingsCards": {
        "container.moresettings.speed": [
            "AlwaysOnlineCard",
            "BrowserCacheTTLCard",
            "BypassCacheByCookieCard",
            "CacheLevelCard",
            "DevelopmentModeCard",
            "IPV6Card",
            "ImageOptimizationCard",
            "MinifyCard",
            "PurgeCacheCard",
            "RailgunCard"
        ],
        "container.moresettings.security": [
            "AdvanceDDoSCard",
            "BrowserIntegrityCheckCard",
            "ChallengePassageCard",
            "SecurityLevelCard",
            "SSLCard",
            "WAFCard"
        ]
    },
    "locale": "en",
    "integrationName": "frontend",
    "useHostAPILogin": true,
    "version": "2.8.1"
}
```
