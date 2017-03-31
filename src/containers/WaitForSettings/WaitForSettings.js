import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isActiveZoneOnCloudflare } from '../../selectors/activeZone';
import Loading from 'cf-component-loading';
import Text from 'cf-component-text';
import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getZoneAnalyticsForZoneId } from '../../selectors/zoneAnalytics';
import { getAllZoneSettingsForZoneId } from '../../selectors/zoneSettings';
import { isDNSPageEnabled } from '../../selectors/config';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import {
  CLOUDFLARE_ADD_SITE_PAGE,
  DOMAINS_OVERVIEW_PAGE
} from '../../constants/UrlPaths.js';

class WaitForSettings extends Component {
  handleClick(path) {
    let { dispatch } = this.props;
    dispatch(push(path));
  }

  render() {
    let {
      activeZone,
      zoneSettings,
      zonePluginSettings,
      zoneAnalytics,
      settings,
      pluginSettings,
      analytics,
      config
    } = this.props;
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

    var link = (
      <Link href={CLOUDFLARE_ADD_SITE_PAGE} target="_blank">Cloudflare</Link>
    );
    if (isDNSPageEnabled(config)) {
      link = (
        <Link onClick={() => this.handleClick(DOMAINS_OVERVIEW_PAGE)}>
          <FormattedMessage id="container.dnsManagementPage.title" />
        </Link>
      );
    }

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
    zoneAnalytics: state.zoneAnalytics,
    config: state.config
  };
}
export default injectIntl(connect(mapStateToProps)(WaitForSettings));
