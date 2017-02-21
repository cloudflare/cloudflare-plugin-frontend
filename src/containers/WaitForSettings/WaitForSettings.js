import React, { Component } from "react";
import { connect } from "react-redux";
import { isActiveZoneOnCloudflare } from "../../selectors/activeZone";
import Loading from "cf-component-loading";
import Text from "cf-component-text";
import { getPluginSettingsForZoneId } from "../../selectors/pluginSettings";
import { FormattedMessage, injectIntl } from "react-intl";
import { getZoneAnalyticsForZoneId } from "../../selectors/zoneAnalytics";
import { getAllZoneSettingsForZoneId } from "../../selectors/zoneSettings";

class WaitForSettings extends Component {
  render() {
    let {
      activeZone,
      zoneSettings,
      zonePluginSettings,
      zoneAnalytics
    } = this.props;
    let { settings, pluginSettings, analytics } = this.props;

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

    return (
      <div>
        {!isEverythingLoaded &&
          isZoneOnCloudflare &&
          <Text align="center"><Loading /></Text>}
        {!isEverythingLoaded &&
          !isZoneOnCloudflare &&
          <Text align="center">
            <FormattedMessage id="errors.noActiveZoneSelected" />
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
