import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';
import Loading from 'cf-component-loading';
import Text from 'cf-component-text';

import { isActiveZoneOnCloudflare } from '../../selectors/activeZone';
import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';

class HomePage extends Component {
    render() {
        let { activeZone, zoneSettings } = this.props;
        let isZoneOnCloudflare = isActiveZoneOnCloudflare(activeZone);
        let isSettingsEmpty = _.isEmpty(zoneSettings[activeZone.id]) && _.isEmpty(getPluginSettingsForZoneId(activeZone.id, this.state));

        return (
          <div>
              {isSettingsEmpty && isZoneOnCloudflare && (
                <Text align="center"><Loading/></Text>
              )}
              {isSettingsEmpty && !isZoneOnCloudflare && (
                <Text align="center"><FormattedMessage id="errors.noActiveZoneSelected" /></Text>
              )}
              {!isSettingsEmpty && isZoneOnCloudflare && (
                    <div>
                        <Heading size={1}><FormattedMessage id="container.appNavigation.home"/></Heading>
                        
                        { renderCards(config.homePageCards) }
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZone: state.activeZone,
        config: state.config.config,
        zoneSettings: state.zoneSettings.entities,
    };
}
export default injectIntl(connect(mapStateToProps)(HomePage));