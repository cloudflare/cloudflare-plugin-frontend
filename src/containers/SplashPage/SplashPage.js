import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import { Box } from 'cf-component-box';
import { Button } from 'cf-component-button';
import { Heading } from 'cf-component-heading';
import { getConfigValue } from '../../selectors/config';

import { Card, CardSection } from 'cf-component-card';

import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';

import BenefitsCollection from '../../containers/BenefitsCollection/BenefitsCollection';

import {
  CLOUDFLARE_SIGNUP_PAGE,
  LOGIN_PAGE,
  HOME_PAGE,
  SIGN_UP_PAGE
} from '../../constants/UrlPaths.js';
import { isLoggedIn } from '../../utils/Auth/Auth';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import { openWindow720x720 } from '../../utils/utils.js';

const cardBoxStyles = {
  margin: '2em auto',
  maxWidth: '1024px',
  textAlign: 'center'
};

const linkStyles = {
  textDecoration: 'none',
  color: '#1592E6'
};

const textStyles = {
  color: '#9A9D9E'
};

const cardPaddingStyles = {
  padding: '65px 0'
};

class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.navigateToSignUpPage = this.navigateToSignUpPage.bind(this);
    this.openWindow720x720 = openWindow720x720.bind(this);
  }

  componentWillMount() {
    let { dispatch } = this.props;
    if (isLoggedIn()) {
      dispatch(push(HOME_PAGE));
    }
  }

  navigateToSignUpPage() {
    const { config } = this.props;
    let { dispatch } = this.props;
    const useHostAPILogin = getConfigValue(config, 'useHostAPILogin');

    if (useHostAPILogin) {
      dispatch(push(SIGN_UP_PAGE));
    } else {
      this.openWindow720x720(CLOUDFLARE_SIGNUP_PAGE);
    }
  }

  render() {
    const { config } = this.props;

    const integrationName = getConfigValue(config, 'integrationName');
    const integrationNameCapital =
      integrationName.charAt(0).toUpperCase() + integrationName.slice(1);

    return (
      <Box {...cardBoxStyles}>
        <Card>
          <Box {...cardPaddingStyles}>
            <CardSection>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Heading size={1}>
                      <FormattedMessage
                        id="container.splashPage.heading.speedUp"
                        values={{
                          integrationName: integrationNameCapital
                        }}
                      />
                    </Heading>
                  </LayoutColumn>
                </LayoutRow>

                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Button
                      type="success"
                      onClick={() => this.navigateToSignUpPage()}
                    >
                      <FormattedMessage id="container.splashPage.button.createFreeAccount" />
                    </Button>
                  </LayoutColumn>
                </LayoutRow>

                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <p style={textStyles}>
                      <FormattedMessage id="container.splashPage.help.alreadyHaveAccount" />{' '}
                      <Link style={linkStyles} to={LOGIN_PAGE}>
                        <FormattedMessage id="container.splashPage.help.here" />
                      </Link>
                      .
                    </p>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <BenefitsCollection />
                  </LayoutColumn>
                </LayoutRow>
              </LayoutContainer>
            </CardSection>
          </Box>
        </Card>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

export default injectIntl(connect(mapStateToProps)(SplashPage));
