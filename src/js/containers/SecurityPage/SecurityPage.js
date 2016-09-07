import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import BrowserIntegrityCheckCard from '../../containers/BrowserIntegrityCheckCard/BrowserIntegrityCheckCard';
import ChallengePassageCard from '../../containers/ChallengePassageCard/ChallengePassageCard';
import FeatureManager from '../../components/FeatureManager/FeatureManager';
import SecurityLevelCard from '../../containers/SecurityLevelCard/SecurityLevelCard';
import SSLCard from '../../containers/SSLCard/SSLCard';

class SecurityPage extends Component {

    render() {
        let { activeZoneId, zoneSettings } = this.props;
        let isSettingsEmpty = _.isEmpty(zoneSettings.entities[activeZoneId]);

        return (
            <div>
                {isSettingsEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isSettingsEmpty && (
                    <div>
                        <Heading size={1}><FormattedMessage id="container.securityPage.title"/></Heading>
                        <FeatureManager isEnabled={this.props.config.featureManagerIsSSLEnabled}>
                            <SSLCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={this.props.config.featureManagerIsSecurityLevelEnabled}>
                            <SecurityLevelCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={this.props.config.featureManagerIsChallengePassageEnabled}>
                            <ChallengePassageCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={this.props.config.featureManagerIsBrowserIntegrityCheckEnabled}>
                            <BrowserIntegrityCheckCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={this.props.config.featureManagerIsScanEnabled}>
                            <ScanCard/>
                        </FeatureManager>
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
        zoneSettings: state.zoneSettings,
    };
}
export default injectIntl(connect(mapStateToProps)(SecurityPage));