import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LayoutRow, LayoutColumn } from 'cf-component-layout';
import { Flex } from 'cf-component-flex';
import { FormattedMessage, injectIntl } from 'react-intl';

import MarketingFeature
  from '../../components/MarketingFeature/MarketingFeature';
import { getAbsoluteUrl } from '../../selectors/config';

class MarketingFeatureCollection extends Component {
  render() {
    const { config } = this.props;
    let { formatMessage } = this.props.intl;

    return (
      <LayoutRow>
        <div style={{ backgroundColor: 'white' }}>
          <Flex spacing={false}>
            <LayoutColumn width={1 / 18}>&nbsp;</LayoutColumn>
            <LayoutColumn width={4 / 18}>
              <MarketingFeature
                imgSrc={getAbsoluteUrl(config, 'assets/icon-pin.svg')}
                title={formatMessage({
                  id: 'component.marketingFeature.cdn.title'
                })}
                description={formatMessage({
                  id: 'component.marketingFeature.cdn.description'
                })}
              />
            </LayoutColumn>
            <LayoutColumn width={4 / 18}>
              <MarketingFeature
                imgSrc={getAbsoluteUrl(config, 'assets/icon-bolt.svg')}
                title={formatMessage({
                  id: 'component.marketingFeature.optimization.title'
                })}
                description={formatMessage({
                  id: 'component.marketingFeature.optimization.description'
                })}
              />
            </LayoutColumn>
            <LayoutColumn width={4 / 18}>
              <MarketingFeature
                imgSrc={getAbsoluteUrl(config, 'assets/icon-shield.svg')}
                title={formatMessage({
                  id: 'component.marketingFeature.security.title'
                })}
                description={formatMessage({
                  id: 'component.marketingFeature.security.description'
                })}
              />
            </LayoutColumn>
            <LayoutColumn width={4 / 18}>
              <MarketingFeature
                imgSrc={getAbsoluteUrl(config, 'assets/icon-lock.svg')}
                title={formatMessage({
                  id: 'component.marketingFeature.ddos.title'
                })}
                description={formatMessage({
                  id: 'component.marketingFeature.ddos.description'
                })}
              />
            </LayoutColumn>
            <LayoutColumn width={1 / 18}>&nbsp;</LayoutColumn>
          </Flex>
        </div>
      </LayoutRow>
    );
  }
}

function mapStateToProps(state) {
  return { config: state.config };
}

export default injectIntl(connect(mapStateToProps)(MarketingFeatureCollection));
