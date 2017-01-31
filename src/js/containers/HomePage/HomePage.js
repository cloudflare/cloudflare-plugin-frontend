import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Heading } from 'cf-component-heading';

import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';
import WaitForSettings from '../../containers/WaitForSettings/WaitForSettings';

class HomePage extends Component {
  render() {
    let { config } = this.props;

    return (
      <WaitForSettings settings pluginSettings>
        <Heading size={1}><FormattedMessage id="container.appNavigation.home"/></Heading>
        { renderCards(config.homePageCards) }
      </WaitForSettings>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config.config
  };
}
export default injectIntl(connect(mapStateToProps)(HomePage));