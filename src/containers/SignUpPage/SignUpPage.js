import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import * as UserActionCreators from '../../actions/user';
import { notificationAddError } from '../../actions/notifications';
import {
  TERMS_AND_CONDITIONS_PAGE,
  PRIVACY_POLICY_PAGE
} from '../../constants/UrlPaths';
import { Form, FormHeader, FormFieldset, FormLabel } from 'cf-component-form';
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';
import { Button } from 'cf-component-button';
import Input from 'cf-component-input';
import { Checkbox } from 'cf-component-checkbox';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      termsOfService: false
    };
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  handleTermsOfServiceChange(event) {
    this.setState({ termsOfService: event.target.value });
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    let { dispatch } = this.props;
    let { formatMessage } = this.props.intl;

    let email = this.state.email;
    let password = this.state.password;
    let password2 = this.state.passwordConfirm;
    let isTermsOfServiceChecked = this.state.termsOfService;

    if (!isTermsOfServiceChecked) {
      dispatch(
        notificationAddError(
          formatMessage({ id: 'container.signup.error.termsOfService' })
        )
      );
      return;
    }

    if (_.isEmpty(email)) {
      dispatch(
        notificationAddError(
          formatMessage({ id: 'container.signup.error.emailBlank' })
        )
      );
      return;
    }

    if (_.isEmpty(password) || _.isEmpty(password2)) {
      dispatch(
        notificationAddError(
          formatMessage({ id: 'container.signup.error.passwordBlank' })
        )
      );
      return;
    }

    if (password !== password2) {
      dispatch(
        notificationAddError(
          formatMessage({ id: 'container.signup.error.passwordsDontMatch' })
        )
      );
      return;
    }

    dispatch(UserActionCreators.asyncUserSignup(email, password));
  }

  render() {
    let { formatMessage } = this.props.intl;

    let overflowStyle = { overflow: 'hidden' };

    return (
      <div
        id="cf-login-page"
        style={{ margin: '2rem auto', maxWidth: '400px' }}
      >
        <Form layout="vertical" onSubmit={e => this.handleSignUpSubmit(e)}>
          <LayoutContainer>
            <div style={overflowStyle}>
              <LayoutRow>
                <LayoutColumn width={1 / 1}>
                  <FormHeader
                    title={formatMessage({ id: 'container.signup.form.title' })}
                  />
                </LayoutColumn>
              </LayoutRow>
            </div>
            <FormFieldset legend="">
              <div style={overflowStyle}>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <FormLabel hidden>
                      <FormattedMessage id="container.signup.form.email" />
                    </FormLabel>
                    <Input
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange.bind(this)}
                      placeholder={formatMessage({
                        id: 'container.signup.form.email'
                      })}
                    />
                  </LayoutColumn>
                </LayoutRow>
              </div>

              <div style={overflowStyle}>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <FormLabel hidden>
                      <FormattedMessage id="component.login.form.password" />
                    </FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange.bind(this)}
                      placeholder={formatMessage({
                        id: 'container.signup.form.password'
                      })}
                    />
                  </LayoutColumn>
                </LayoutRow>
              </div>

              <div style={overflowStyle}>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <FormLabel hidden>
                      <FormattedMessage id="container.signup.form.passwordAgain" />
                    </FormLabel>
                    <Input
                      name="passwordConfirm"
                      type="password"
                      value={this.state.passwordConfirm}
                      onChange={this.handlePasswordConfirmChange.bind(this)}
                      placeholder={formatMessage({
                        id: 'container.signup.form.passwordAgain'
                      })}
                    />
                  </LayoutColumn>
                </LayoutRow>
              </div>

              <div style={overflowStyle}>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Checkbox
                      label={false}
                      name="termsOfService"
                      value="termsOfService"
                      checked={this.state.termsOfService}
                      onChange={this.handleTermsOfServiceChange.bind(this)}
                    />
                    <FormLabel>
                      <FormattedMessage id="container.signup.form.termsAndConditions.iAgreeTo" />
                      <a href={TERMS_AND_CONDITIONS_PAGE} target="_blank">
                        <FormattedMessage id="container.signup.form.termsAndConditions.cloudFlaresTermsAndConditions" />
                      </a>{' '}
                      <FormattedMessage id="container.signup.form.termsAndConditions.and" />{' '}
                      <a href={PRIVACY_POLICY_PAGE} target="_blank">
                        <FormattedMessage id="container.signup.form.termsAndConditions.privacyPolicy" />
                      </a>
                      <FormattedMessage id="container.signup.form.termsAndConditions.period" />
                    </FormLabel>
                  </LayoutColumn>
                </LayoutRow>
              </div>

              <div style={overflowStyle}>
                <LayoutRow>
                  <LayoutColumn width={1 / 1}>
                    <Button
                      submit
                      type="success"
                      onClick={e => this.handleSignUpSubmit(e)}
                    >
                      <FormattedMessage id="container.signup.form.button" />
                    </Button>
                  </LayoutColumn>
                </LayoutRow>
              </div>
            </FormFieldset>
          </LayoutContainer>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state: state };
}

export default injectIntl(connect(mapStateToProps)(SignUpPage));
