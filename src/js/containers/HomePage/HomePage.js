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
        let { activeZoneId, config, zoneSettings } = this.props;
        let isEmpty = _.isEmpty(zoneSettings[activeZoneId]) && _.isEmpty(getPluginSettingsForZoneId(activeZoneId, this.state));

        return (
            <div>
                {isEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isEmpty && (
                    <div>
                        <Heading size={1}><FormattedMessage id="container.performancePage.title"/></Heading>

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
        zoneSettings: state.zoneSettings.entities
    }
}
export default injectIntl(connect(mapStateToProps)(HomePage));