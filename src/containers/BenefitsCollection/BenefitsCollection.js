import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LayoutRow, LayoutColumn } from 'cf-component-layout';
import { Flex } from 'cf-component-flex';
import { injectIntl } from 'react-intl';

import BenefitsFeature from '../../components/BenefitsFeature/BenefitsFeature';
import { getAbsoluteUrl } from '../../selectors/config';

class BenefitsCollection extends Component {
  render() {
    const { config } = this.props;
    let { formatMessage } = this.props.intl;

    return (
      <LayoutRow>
        <Flex spacing={false}>
          <LayoutColumn width={1 / 18}>&nbsp;</LayoutColumn>
          <LayoutColumn width={4 / 18}>
            <BenefitsFeature
              imgSrc={getAbsoluteUrl(config, 'assets/global-caching.svg')}
              title={formatMessage({
                id: 'component.benefitsFeature.globalCaching.title'
              })}
              description={formatMessage({
                id: 'component.benefitsFeature.globalCaching.description'
              })}
            />
          </LayoutColumn>
          <LayoutColumn width={4 / 18}>
            <BenefitsFeature
              imgSrc={getAbsoluteUrl(config, 'assets/web-optimization.svg')}
              title={formatMessage({
                id: 'component.benefitsFeature.optimization.title'
              })}
              description={formatMessage({
                id: 'component.benefitsFeature.optimization.description'
              })}
            />
          </LayoutColumn>
          <LayoutColumn width={4 / 18}>
            <BenefitsFeature
              imgSrc={getAbsoluteUrl(config, 'assets/security.svg')}
              title={formatMessage({
                id: 'component.benefitsFeature.security.title'
              })}
              description={formatMessage({
                id: 'component.benefitsFeature.security.description'
              })}
            />
          </LayoutColumn>
          <LayoutColumn width={4 / 18}>
            <BenefitsFeature
              imgSrc={getAbsoluteUrl(config, 'assets/insight.svg')}
              title={formatMessage({
                id: 'component.benefitsFeature.insights.title'
              })}
              description={formatMessage({
                id: 'component.benefitsFeature.insights.description'
              })}
            />
          </LayoutColumn>
          <LayoutColumn width={1 / 18}>&nbsp;</LayoutColumn>
        </Flex>
      </LayoutRow>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.config };
}

export default injectIntl(connect(mapStateToProps)(BenefitsCollection));
