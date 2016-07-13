import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import FeatureManager from '../../components/FeatureManager/FeatureManager';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';

class HomePage extends Component {
    render() {
        let { activeZoneId, config, zoneSettings, zoneScan } = this.props;
        let isEmpty = _.isEmpty(zoneSettings[activeZoneId]) && _.isEmpty(getPluginSettingsForZoneId(activeZoneId, this.state)) && _.isEmpty(zoneScan.entities[activeZoneId]);

        return (
            <div>
                {isEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isEmpty && (
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
        activeZoneId: state.activeZone.id,
        config: state.config.config,
        zoneSettings: state.zoneSettings.entities,
        zoneScan: state.zoneScan
    }
}
export default injectIntl(connect(mapStateToProps)(HomePage));