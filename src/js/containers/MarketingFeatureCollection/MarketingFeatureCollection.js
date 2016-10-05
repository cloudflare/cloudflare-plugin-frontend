import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';

import MarketingFeature from '../../components/MarketingFeature/MarketingFeature';
import { getAbsoluteUrl } from '../../selectors/config';

class MarketingFeatureCollection extends Component {

    render() {
        const { config } = this.props;

        return (
            <LayoutContainer>
                <LayoutRow>
                    <LayoutColumn width={1/4}>
                        <MarketingFeature imgSrc={ getAbsoluteUrl(config, 'assets/icon-pin.svg') } titleKey="component.marketingFeature.cdn.title" descriptionKey="component.marketingFeature.cdn.description" />
                    </LayoutColumn>
                    <LayoutColumn  width={1/4}>
                        <MarketingFeature imgSrc={ getAbsoluteUrl(config, 'assets/icon-bolt.svg') } titleKey="component.marketingFeature.optimization.title" descriptionKey="component.marketingFeature.optimization.description" />
                    </LayoutColumn>
                    <LayoutColumn width={1/4}>
                        <MarketingFeature imgSrc={ getAbsoluteUrl(config, 'assets/icon-shield.svg') } titleKey="component.marketingFeature.security.title" descriptionKey="component.marketingFeature.security.description" />
                    </LayoutColumn>
                    <LayoutColumn width={1/4}>
                        <MarketingFeature imgSrc={ getAbsoluteUrl(config, 'assets/icon-lock.svg') } titleKey="component.marketingFeature.ddos.title" descriptionKey="component.marketingFeature.ddos.description" />
                    </LayoutColumn>
                </LayoutRow>
            </LayoutContainer>
        );
    }
}

function mapStateToProps(state) {
    return { config: state.config };
}

export default connect(mapStateToProps)(MarketingFeatureCollection);