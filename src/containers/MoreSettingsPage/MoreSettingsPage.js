import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';
import WaitForSettings from '../../containers/WaitForSettings/WaitForSettings';

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
    return (
      <WaitForSettings settings pluginSettings>
        { this.renderContent() }
      </WaitForSettings>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config.config,
  };
}
export default injectIntl(connect(mapStateToProps)(MoreSettingsPage));