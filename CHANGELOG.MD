# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.2.1](#2.2.1) - 2016-08-24
### Changed
- Updated Toggle cards to be consistent with others. [#26](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/26)

## [2.2.0](#2.2.0) - 2016-08-24
### Added
- Added alert when user is using subdomain. [#23](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/23)

### Changed
- Updated french localization. [#24](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/24)

## [2.1.1](#2.1.1) - 2016-08-16
### Added
- Added PluginSpecificCacheTagCard which will turn on the plugin specific cache integration for cache tags. [#22](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/22)

## [2.1.0](#2.1.0) - 2016-08-12
### Added
- Added PluginSpecificCacheCard which will turn on plugin specific cache integration. [#19](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/19)

### Changed
- Advanced DDOS card only shows if the user's plan supports it [#16](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/16)
- Consolidated logic for generating Google Analytics Tracking Links [#20](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/20)

### Fixed
- Fixed but which caused signups to fail on Chrome [#21](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/21)

## [2.0.0](#2.0.0) - 2016-07-15
### Added
- Added the IP Rewrite Card and Protocol Rewrite Card [#5](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/5),[#6](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/6)
- Added the Image Optimization Card [#9](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/9)
- Added the Apply Default Settings Card [#11](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/11)

### Changed
- Purge Cache supports purging individual files now. [#7](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/7)

### Fixed
- API Login handles errors now. [#10](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/10)

## [1.0.1](#1.0.1) - 2016-06-07
### Fixed
- Fixed bug where enabled railguns were displaying as disabled. [#4](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/4)

## [1.0.0](#1.0.0) - 2016-05-25
### Added
- Added the ability to specify a `absoluteUrlBase` for integrations where relative paths break. [#1](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/1)
