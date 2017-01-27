import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { getAllZoneSettingsForZoneId } from '../../selectors/zoneSettings';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';
import WaitForSettings from '../../components/WaitForSettings/WaitForSettings';

class MoreSettingsPage extends Component {

  renderContent() {
    let { config } = this.props;
    var count = 0;

    return _.map(config.moreSettingsCards, function(value, key) {
      var categoryTitle = key;
      return (
        <div key={count++}>
          <Heading size={1}><FormattedMessage id={ categoryTitle } /></Heading>
          { renderCards(value) }
        </div>
      );
    });
  }

  render() {
    let { activeZone, zoneSettings, pluginSettings } = this.props;

    return (
      <WaitForSettings activeZone={activeZone} settings={getAllZoneSettingsForZoneId(activeZone.id, zoneSettings)} pluginSettings={getPluginSettingsForZoneId(activeZone.id, pluginSettings)}>
        { this.renderContent() }
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
export default injectIntl(connect(mapStateToProps)(MoreSettingsPage));