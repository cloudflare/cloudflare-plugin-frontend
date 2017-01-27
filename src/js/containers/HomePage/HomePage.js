import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Heading } from 'cf-component-heading';

import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { getAllZoneSettingsForZoneId } from '../../selectors/zoneSettings';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';
import WaitForSettings from '../../components/WaitForSettings/WaitForSettings';

class HomePage extends Component {
  render() {
    let { activeZone, zoneSettings, config, pluginSettings } = this.props;

    return (
      <WaitForSettings activeZone={activeZone} settings={getAllZoneSettingsForZoneId(activeZone.id, zoneSettings)} pluginSettings={getPluginSettingsForZoneId(activeZone.id, pluginSettings)}>
        <Heading size={1}><FormattedMessage id="container.appNavigation.home"/></Heading>
        { renderCards(config.homePageCards) }
      </WaitForSettings>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZone: state.activeZone,
    config: state.config.config,
    zoneSettings: state.zoneSettings,
    pluginSettings: state.pluginSettings
  };
}
export default injectIntl(connect(mapStateToProps)(HomePage));