import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isActiveZoneOnCloudflare } from '../../selectors/activeZone';
import Loading from 'cf-component-loading';
import Text from 'cf-component-text';
import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getZoneAnalyticsForZoneId } from '../../selectors/zoneAnalytics';
import { getAllZoneSettingsForZoneId } from '../../selectors/zoneSettings';
import { CLOUDFLARE_ADD_SITE_PAGE } from '../../constants/UrlPaths.js';

class WaitForSettings extends Component {
  render() {
    let {
      activeZone,
      zoneSettings,
      zonePluginSettings,
      zoneAnalytics
    } = this.props;
    let { settings, pluginSettings, analytics } = this.props;
    const { formatMessage } = this.props.intl;

    let isSettingsLoaded = true;
    let isPluginSettingsLoaded = true;
    let isAnalyticsLoaded = true;

    if (settings) {
      isSettingsLoaded = getAllZoneSettingsForZoneId(
        activeZone.id,
        zoneSettings
      );
    }

    if (pluginSettings) {
      isPluginSettingsLoaded = getPluginSettingsForZoneId(
        activeZone.id,
        zonePluginSettings
      );
    }

    if (analytics) {
      isAnalyticsLoaded = getZoneAnalyticsForZoneId(
        activeZone.id,
        zoneAnalytics
      );
    }

    let isZoneOnCloudflare = isActiveZoneOnCloudflare(activeZone);

    let isEverythingLoaded = isSettingsLoaded &&
      isPluginSettingsLoaded &&
      isAnalyticsLoaded;

    let link = (
      <a href={CLOUDFLARE_ADD_SITE_PAGE} target="_blank">Cloudflare</a>
    );

    return (
      <div>
        {!isEverythingLoaded &&
          isZoneOnCloudflare &&
          <Text align="center"><Loading /></Text>}
        {!isEverythingLoaded &&
          !isZoneOnCloudflare &&
          <Text align="center">
            <FormattedMessage
              id="errors.noActiveZoneSelected"
              values={{ link: link, domain: activeZone.name }}
            />
          </Text>}
        {isEverythingLoaded && isZoneOnCloudflare && this.props.children}
      </div>
    );
  }
}

WaitForSettings.propTypes = {
  settings: React.PropTypes.bool,
  pluginSettings: React.PropTypes.bool,
  analytics: React.PropTypes.bool
};

function mapStateToProps(state) {
  return {
    activeZone: state.activeZone,
    zoneSettings: state.zoneSettings,
    zonePluginSettings: state.pluginSettings,
    zoneAnalytics: state.zoneAnalytics
  };
}
export default injectIntl(connect(mapStateToProps)(WaitForSettings));
