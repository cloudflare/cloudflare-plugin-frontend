import React, { Component } from 'react';
import { isActiveZoneOnCloudflare } from '../../selectors/activeZone';
import Loading from 'cf-component-loading';
import Text from 'cf-component-text';
import { FormattedMessage, injectIntl } from 'react-intl';

class WaitForSettings extends Component {

  render() {
    let activeZone = this.props.activeZone;
    let analytics = (typeof this.props.analytics != 'undefined' ? this.props.analyics : true);
    let settings = (typeof this.props.settings != 'undefined' ? this.props.settings : true);
    let pluginSettings = (typeof this.props.pluginSettings != 'undefined' ? this.props.pluginSettings : true);

    let isZoneOnCloudflare = isActiveZoneOnCloudflare(activeZone);

    let isEverythingLoaded = settings && pluginSettings && analytics;

    return (
      <div>
        {!isEverythingLoaded && isZoneOnCloudflare && (
          <Text align="center"><Loading/></Text>
        )}
        {!isEverythingLoaded && !isZoneOnCloudflare && (
          <Text align="center"><FormattedMessage id="errors.noActiveZoneSelected" /></Text>
        )}
        {isEverythingLoaded && isZoneOnCloudflare && (
          this.props.children
        )}
      </div>
    );
  }
}

WaitForSettings.propTypes = {
  activeZone: React.PropTypes.object.isRequired,
  settings: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.oneOf([false])
  ]),
  pluginSettings: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.oneOf([false])
  ]),
  analytics: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.oneOf([false])
  ])
};

export default injectIntl(WaitForSettings);

