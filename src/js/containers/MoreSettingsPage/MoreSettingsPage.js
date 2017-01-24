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
                        
                        { this.renderContent() }
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
export default injectIntl(connect(mapStateToProps)(MoreSettingsPage));