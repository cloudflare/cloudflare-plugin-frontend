import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import AlwaysOnlineCard from '../../containers/AlwaysOnlineCard/AlwaysOnlineCard';
import CacheLevelCard from '../../containers/CacheLevelCard/CacheLevelCard';
import BrowserCacheTTLCard from '../../containers/BrowserCacheTTLCard/BrowserCacheTTLCard';
import DevelopmentModeCard from '../../containers/DevelopmentModeCard/DevelopmentModeCard';
import FeatureManager from '../../components/FeatureManager/FeatureManager';
import IPV6Card from '../../containers/IPV6Card/IPV6Card';
import IpRewriteCard from '../../containers/IpRewriteCard/IpRewriteCard';
import MinifyCard from '../../containers/MinifyCard/MinifyCard';
import PurgeCacheCard from '../../containers/PurgeCacheCard/PurgeCacheCard';
import ProtocolRewriteCard from '../../containers/ProtocolRewriteCard/ProtocolRewriteCard';
import RailgunCard from '../../containers/RailgunCard/RailgunCard';
import ImageOptimizationCard from '../../containers/ImageOptimizationCard/ImageOptimizationCard';
import WAFCard from '../../containers/WAFCard/WAFCard';



class PerformancePage extends Component {

    render() {
        let { activeZoneId, config, zoneSettings } = this.props;

        let isEmpty = _.isEmpty(zoneSettings[activeZoneId]) && _.isEmpty(getPluginSettingsForZoneId(activeZoneId, this.state));

        return (
            <div>
                {isEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isEmpty && (
                    <div>
                        <Heading size={1}><FormattedMessage id="container.performancePage.title"/></Heading>

                        <FeatureManager isEnabled={config.featureManagerIsAlwaysOnlineEnabled}>
                            <AlwaysOnlineCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsIpv6Enabled}>
                            <IPV6Card/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsIpRewriteEnabled}>
                            <IpRewriteCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsProtocolRewriteEnabled}>
                            <ProtocolRewriteCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsCacheLevelEnabled}>
                            <CacheLevelCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsMinifyEnabled}>
                            <MinifyCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsRailgunEnabled}>
                            <RailgunCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsDevelopmentModeEnabled}>
                            <DevelopmentModeCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsBrowserCacheTTLEnabled}>
                            <BrowserCacheTTLCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsPurgeCacheEnabled}>
                            <PurgeCacheCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsImageOptimizationEnabled}>
                            <ImageOptimizationCard/>
                        </FeatureManager>

                        <FeatureManager isEnabled={config.featureManagerIsWAFEnabled}>
                            <WAFCard/>
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
        zoneSettings: state.zoneSettings.entities
    };
}
export default injectIntl(connect(mapStateToProps)(PerformancePage));