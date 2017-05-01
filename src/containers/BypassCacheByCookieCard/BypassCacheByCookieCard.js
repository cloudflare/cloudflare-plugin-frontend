import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import { Button } from 'cf-component-button';

import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import CustomCardControl
  from '../../components/CustomCardControl/CustomCardControl';
import { BIZ_PLAN } from '../../constants/Plans.js';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';

const MINIMUM_PLAN = BIZ_PLAN;

class BypassCacheByCookieCard extends Component {
  constructor(props) {
    super(props);
    this.className = 'BypassCacheByCookieCard';
    this.state = {
      activeDrawer: null
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  handleDrawerClick(id) {
    this.setState({
      activeDrawer: id === this.state.activeDrawer ? null : id
    });
  }

  onButtonClick(link) {
    window.open(link, '_blank');
  }

  render() {
    const { formatMessage } = this.props.intl;

    let { activeZone, config, zones } = this.props;
    let zone = zones[activeZone.name];

    // Currently this is hardcoded for WordPress only
    let contentLink =
      'https://support.cloudflare.com/hc/en-us/articles/236166048-Caching-Static-HTML-with-WordPress-WooCommerce';
    let upgradeLinkWithUTM = generateUTMLink(
      contentLink,
      config.integrationName,
      config.integrationName,
      this.className
    );

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({
                id: 'container.bypassCacheByCookieCard.title'
              })}
            >
              <p>
                <FormattedMessage id="container.bypassCacheByCookieCard.description" />
              </p>
            </CardContent>
            <CustomCardControl
              minimumPlan={MINIMUM_PLAN}
              currentPlan={zone.plan.legacy_id}
              indentifier={this.className}
            >
              <Button
                type="primary"
                onClick={this.onButtonClick.bind(this, upgradeLinkWithUTM)}
              >
                <FormattedMessage id="container.bypassCacheByCookieCard.button" />
              </Button>
            </CustomCardControl>
          </CardSection>
          <CardDrawers
            onClick={this.handleDrawerClick}
            active={this.state.activeDrawer}
            drawers={[
              {
                id: 'help',
                name: formatMessage({ id: 'container.drawer.help' }),
                content: (
                  <FormattedMarkdown text="container.bypassCacheByCookieCard.drawer.help" />
                )
              }
            ]}
          />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config.config,
    activeZone: state.activeZone,
    zones: state.zones.entities.zones
  };
}
export default injectIntl(connect(mapStateToProps)(BypassCacheByCookieCard));
