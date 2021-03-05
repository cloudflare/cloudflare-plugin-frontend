import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardControl } from 'cf-component-card';
import { Button } from 'cf-component-button';
import { Heading } from 'cf-component-heading';

class AnaltyicsPage extends Component {
  render() {
    let { activeZone } = this.props;
    const accountId = activeZone.account.id;
    const analyticsDeepLink = `https://dash.cloudflare.com/${accountId}/${activeZone.name}/analytics`;

    return (
      <div>
        <Heading size={1}>
          <FormattedMessage id="container.analyticsPage.title" />
        </Heading>

        <Card>
          <CardSection>
            <CardContent title={<FormattedMessage id="container.analyticCard.graphql.header" />}>
              <p>
                <FormattedMessage id="container.analyticCard.graphql.overview" />
              </p>
            </CardContent>
            <CardControl>
              <Button type="primary" onClick={function(){window.open(analyticsDeepLink, '_blank', 'noopener,noreferrer')}}>
                <FormattedMessage id="container.analyticCard.graphql.linkMessage" />
              </Button>
            </CardControl>
          </CardSection>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZone: state.activeZone
  };
}

export default injectIntl(connect(mapStateToProps)(AnaltyicsPage));
