import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Heading } from 'cf-component-heading';
import { Card, CardSection, CardContent } from 'cf-component-card';

class AnaltyicsPage extends Component {
  render() {
    // Use I18n for messaging
    const { formatMessage } = this.props.intl;

    let { activeZone } = this.props;
    const accountId = activeZone.account.id;
    const analyticsDeepLink = `https://dash.cloudflare.com/${accountId}/${activeZone.name}/analytics`;
    return (
      <div>
        <Heading size={1}>
          <FormattedMessage id="container.analyticsPage.title" />
        </Heading>
        <div style={{ backgroundColor: '#FFFFFF' }}>
          <Card>
            <CardSection>
              <CardContent title="Zone Analytics">
                <hr style={{ margin: '1rem 0' }} width="100%" />
                <div style={{ textAlign: 'center' }}>
                  <a href={analyticsDeepLink} target="_blank">
                    {'Click Here, What do we want to say here?'}
                  </a>
                </div>
              </CardContent>
            </CardSection>
          </Card>
        </div>
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
