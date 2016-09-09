# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.4.2](#2.4.2) - 2016-09-08
### Changed
- Changed all async actions to use the new cf-util-http method signature. [#37](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/37)
- Upgraded cf-util-http to fix bug where beforeCallback request method changes were not being persisted. [#36](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/36)

## [2.4.1](#2.4.1) - 2016-09-08
### Added
- Added Eslint. [#35](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/35)

### Fixed
- Fixed bug where localized notifications outputed error to console. [f2c74e](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/33/commits/f2c74ed7d00f1d6950696c37490b41f6481115b2)

## [2.4.0](#2.4.0) - 2016-09-07
### Removed
- Removed the Zone Scan Card. [#35](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/35)

## [2.3.1](#2.3.1) - 2016-09-07
### Added
- Added eslint and formatted code. [#32](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/32)

### Changed
- Updated translations for ApplyDefaultSettingsCard. [#34](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/34)
- Updated component.js for modification date [#31](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/31)

## [2.3.0](#2.3.0) - 2016-09-05
### Added
- Display default settings last applied string [#29](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/29)

### Changed
- Started using cf-component-loading [#30](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/30)

## [2.2.3](#2.2.3) - 2016-08-29
### Fixed
- App, ClientLoginPage containers no longer depend on cf.core.css and now exclusively use cf-component-* components. [#28](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/28)

## [2.2.2](#2.2.2) - 2016-08-25
### Fixed
- Fixed bug where unprovisioned domains could not be provisioned when the DNS page was included on the homepage. [#27](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/27)

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
