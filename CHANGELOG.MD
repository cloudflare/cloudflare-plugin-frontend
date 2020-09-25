# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [3.1.0](#3.1.0) - 2020-09-24
### Added
- Update webpack to accept `OUTPUT_PATH` variable [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)
- Update login text to include API Tokens [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)
- Update prettier config and dependency [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)

### Changed
- Update all paths to dashboard to not include legacy /a routes [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)
- Remove UTM and channel generation for links [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)
- Format code with prettier [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)
- Rename 'Optimize Cloudflare for WordPress' Card [#150](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/150)
- Remove Cache HTML at CDN card since it's redundant [#150](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/150)

### Fixed
- Fix 404s on upgrade links [#143](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/143)

## [3.0.0](#3.0.0) - 2017-7-17
### Changed
- Updated config fetch to use new /config endpoint [#138](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/138)

## [2.8.1](#2.8.1) - 2017-6-28
### Added
- Channel parameters to sign up link on login page [#135](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/135)

## [2.8.0](#2.8.0) - 2017-6-28
### Added
- New splash page added before login [#131](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/131)

### Changed
- Upgraded to React 15.5 [#125](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/125)

### Fixed
- Fixed bug where userConfig.js fetch would error if it didn't exist [#133](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/133)
- Fixed bug in analytics graph [#134](https://github.com/cloudflare/cloudflare-plugin-frontend/pull/134)

## [2.7.0](#2.7.0) - 2017-4-25
### Fixed
- Fix UTM codes for signup and account links [#112](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/112)
- Fix a bug where analytic tab selection not working properly [#113](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/113)
- Fix a bug where active zone selector was not clickable [#114](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/114)
- Fixed bug where Minify was not updating [#116](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/116)

### Changed
- Clarified the text when domain is not on Cloudflare  [#115](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/115)

### Added
- Added help text for all cards [#118](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/118)

## [2.6.7](#2.6.7) - 2017-3-15
### Fixed
- Fix wrong values which are sent to the API [#107](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/107)

## [2.6.6](#2.6.6) - 2017-3-10
### Fixed
- Fix styles for Active Zone selector [#104](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/104)
- Fix some text fields not responding correctly [#105](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/105)

## [2.6.5](#2.6.5) - 2017-3-1
### Fixed
- Fixed bugs related with signup form and cleared warnings printed to console [#102 ](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/102 )

## [2.6.4](#2.6.4) - 2017-3-1
### Fixed
- Fixed a bug where loading spinner wasn't stopping [#93](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/93)

## [2.6.3](#2.6.3) - 2017-2-3
### Added
- Bypass Cache By Cookie Card added [#86](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/86)

## [2.6.2](#2.6.2) - 2017-2-1
### Fixed
- Style changes [#76](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/76) [#85](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/85)
- fixed bug in IE11 [#77](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/77)
- fixed errors not showing properly [#79](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/79)

### Changed
- Plan Upgrade button redirects to a new page [#84](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/84)

### Removed
- Removed unused pages [#75](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/75) [#78] (https://github.com/cloudflare/CloudFlare-FrontEnd/pull/78)

## [2.6.1](#2.6.1) - 2016-11-22
### Fixed
- Gulp compress no longer watches files [#72](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/72)

## Changed
- Removed unused stylesheets, updated cf.core.css to only contain CSS for Header, AppNavigation [#74](https://github.com/cloudflare/CloudFlare-FrontEnd/pull/74)

## [2.6.0](#2.6.0) - 2016-11-4
### Added
- Added pie charts to analytics tab. [#56](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/56)
- Added popup window when clicking signup. [#61](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/61)
- Added link to fetch API Key. [#63](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/63)

### Changed
- Changed text/javascript to application/javascript [#59](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/59)
- Changed UI to look more cloudflarish [#60](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/60)
- Changed CloudFlare to Cloudflare [#64](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/64)
- Changed active zone selector to disable when there is single zone [#65](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/65)

### Fixed
- Fixed node_env showing development when calling gulp compress. [#58](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/58)

## [2.5.3](#2.5.3) - 2016-10-6
### Fixed
- Fixed login page styles. [#55](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/55)

## [2.5.2](#2.5.2) - 2016-10-5
### Fixed
- Switched MarketingFeatureCollection from cf-component-flex to cf-component-layout to fix style bugs. [#54](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/54)

## [2.5.1](#2.5.1) - 2016-10-5
### Added
- Added "gulp compress" command [#51](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/51)
- Added notifications if Development Mode is "ON" [#52](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/52)

### Changed
- Changed Analytics Page to mimic cloudflare.com dashboard [#48](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/48)
- Changed upgrade button to redirect "clouldflare.com/a/ACTIVE_ZONE/overview" [#50](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/50)

### Fixed
- Fixed active zone selector not showing [#53](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/53)

## [2.5.0](#2.5.0) - 2016-09-26
### Added
- Added AutomaticHTTPSRewritesCard [#46](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/46)

### Fixed
- Fixed bug in Analytics tab showing threats incorrectly [#43](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/43)
- Fixed bug in SSLCard [#44](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/44)
- Fixed bug in ImageOptimization not showing "on" when lossly select [#45](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/45)

## [2.4.5](#2.4.5) - 2016-09-15
### Fixed
- Fixed Updating asyncAction error handling to pass response instead of error variable for business logic error. [#42](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/42)

### Removed
- Removed ApplyDefaultSettingsCard Modal. [#41](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/41)

## [2.4.4](#2.4.4) - 2016-09-14
### Fixed
- Fixed www prefix counting as subdomain. [#40](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/40)

## [2.4.3](#2.4.3) - 2016-09-12
### Changed
- Updated ImageOptimizationCard due to polish API changed. [#38](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/38)

### Fixed
- Fixed a bug where login wasn't using the new cf-util-http method signature [#39](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/39)

## [2.4.2](#2.4.2) - 2016-09-08
### Changed
- Changed all async actions to use the new cf-util-http method signature. [#37](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/37)
- Upgraded cf-util-http to fix bug where beforeCallback request method changes were not being persisted. [#36](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/36)

## [2.4.1](#2.4.1) - 2016-09-08
### Added
- Added Eslint. [#35](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/35)

### Fixed
- Fixed bug where localized notifications outputed error to console. [f2c74e](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/33/commits/f2c74ed7d00f1d6950696c37490b41f6481115b2)

## [2.4.0](#2.4.0) - 2016-09-07
### Removed
- Removed the Zone Scan Card. [#35](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/35)

## [2.3.1](#2.3.1) - 2016-09-07
### Added
- Added eslint and formatted code. [#32](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/32)

### Changed
- Updated translations for ApplyDefaultSettingsCard. [#34](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/34)
- Updated component.js for modification date [#31](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/31)

## [2.3.0](#2.3.0) - 2016-09-05
### Added
- Display default settings last applied string [#29](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/29)

### Changed
- Started using cf-component-loading [#30](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/30)

## [2.2.3](#2.2.3) - 2016-08-29
### Fixed
- App, ClientLoginPage containers no longer depend on cf.core.css and now exclusively use cf-component-* components. [#28](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/28)

## [2.2.2](#2.2.2) - 2016-08-25
### Fixed
- Fixed bug where unprovisioned domains could not be provisioned when the DNS page was included on the homepage. [#27](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/27)

## [2.2.1](#2.2.1) - 2016-08-24
### Changed
- Updated Toggle cards to be consistent with others. [#26](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/26)

## [2.2.0](#2.2.0) - 2016-08-24
### Added
- Added alert when user is using subdomain. [#23](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/23)

### Changed
- Updated french localization. [#24](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/24)

## [2.1.1](#2.1.1) - 2016-08-16
### Added
- Added PluginSpecificCacheTagCard which will turn on the plugin specific cache integration for cache tags. [#22](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/22)

## [2.1.0](#2.1.0) - 2016-08-12
### Added
- Added PluginSpecificCacheCard which will turn on plugin specific cache integration. [#19](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/19)

### Changed
- Advanced DDOS card only shows if the user's plan supports it [#16](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/16)
- Consolidated logic for generating Google Analytics Tracking Links [#20](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/20)

### Fixed
- Fixed but which caused signups to fail on Chrome [#21](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/21)

## [2.0.0](#2.0.0) - 2016-07-15
### Added
- Added the IP Rewrite Card and Protocol Rewrite Card [#5](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/5),[#6](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/6)
- Added the Image Optimization Card [#9](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/9)
- Added the Apply Default Settings Card [#11](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/11)

### Changed
- Purge Cache supports purging individual files now. [#7](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/7)

### Fixed
- API Login handles errors now. [#10](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/10)

## [1.0.1](#1.0.1) - 2016-06-07
### Fixed
- Fixed bug where enabled railguns were displaying as disabled. [#4](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/4)

## [1.0.0](#1.0.0) - 2016-05-25
### Added
- Added the ability to specify a `absoluteUrlBase` for integrations where relative paths break. [#1](https://github.com/cloudflare/Cloudflare-FrontEnd/pull/1)
