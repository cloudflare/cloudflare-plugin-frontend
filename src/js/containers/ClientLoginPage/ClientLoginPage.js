import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button } from 'cf-component-button';
import { Form, FormHeader, FormFieldset, FormLabel } from 'cf-component-form';
import Input from 'cf-component-input';
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';

import MarketingFeatureCollection from '../../containers/MarketingFeatureCollection/MarketingFeatureCollection';
import { asyncAPILogin } from '../../actions/user';
import { CLOUDFLARE_SIGNUP_PAGE, CLOUDFLARE_ACCOUNT_PAGE } from '../../constants/UrlPaths.js';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';

const SIGNUP_UTM_CONTENT_IDENTIFIER = 'signup_now';
const COPY_API_KEY_UTM_CONTENT_IDENTIFIER = 'copy_api_key';

class ClientLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            apiKey: ''
        };
    }

    openLinkInWindow(link) {
        window.open(link, 'wordpress', 'toolbar=0,status=0,width=720,height=700');
    }

    handleEmailChange(email) {
        this.setState({ email });
    }

    handleApiKeyChange(apiKey) {
        this.setState({ apiKey });
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(asyncAPILogin(this.state.email, this.state.apiKey));
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { config } = this.props;

        let signupLinkWithUTM = generateUTMLink(CLOUDFLARE_SIGNUP_PAGE, config.integrationName, config.integrationName, SIGNUP_UTM_CONTENT_IDENTIFIER);
        let accountLinkWithUTM = generateUTMLink(CLOUDFLARE_ACCOUNT_PAGE, config.integrationName, config.integrationName, COPY_API_KEY_UTM_CONTENT_IDENTIFIER);

        var overflowStyle = { overflow: "hidden" };

        return (
            <div>
                <div id="cf-login-page" style={{ margin: "2rem auto" }}>
                    <Form layout="vertical" onSubmit={(e) => this.handleLoginSubmit(e)}>
                        <LayoutContainer>
                            <div style={overflowStyle}>
                                <LayoutRow>
                                    <LayoutColumn width={1/1}>
                                        <FormHeader title={formatMessage({ id: 'component.clientLogin.form.title' })} style={{ textAlign:'center' }}/>
                                    </LayoutColumn>
                                </LayoutRow>
                            </div>
                                <FormFieldset legend="">
                                    <div style={overflowStyle}>
                                        <LayoutRow style={{ overflow: 'hidden' }}>
                                            <LayoutColumn width={1/1}>
                                                <FormLabel hidden><FormattedMessage id="component.clientLogin.form.email"/></FormLabel>
                                                <Input name="email" type="text" value={this.state.email} onChange={this.handleEmailChange.bind(this)} placeholder={formatMessage({ id: 'component.clientLogin.form.email' })}/>
                                            </LayoutColumn>
                                        </LayoutRow>
                                    </div>
                                    <div style={{ overflow: "hidden", paddingBottom: "1px" }}>
                                        <LayoutRow>
                                            <LayoutColumn width={1/1}>
                                                <FormLabel hidden><FormattedMessage id="component.clientLogin.form.apiKey"/></FormLabel>
                                                <Input name="apiKey" type="text" value={this.state.apiKey} onChange={this.handleApiKeyChange.bind(this)} placeholder={formatMessage({ id: 'component.clientLogin.form.apiKey' })}/>
                                            </LayoutColumn>
                                        </LayoutRow>
                                    </div>
                                    <div style={overflowStyle}>
                                        <LayoutRow>
                                            <LayoutColumn width={1/1}>
                                                <Button submit type="success" onClick={(e) => this.handleLoginSubmit(e)}>
                                                    <FormattedMessage id="component.clientLogin.form.button" />
                                                </Button>
                                            </LayoutColumn>
                                        </LayoutRow>
                                    </div>
                                </FormFieldset>
                            <div style={overflowStyle}>
                                <LayoutRow>
                                    <LayoutColumn width={1/1}>
                                        <p style={{ textAlign: 'center', marginBottom: '-1rem' }}><FormattedMessage id="component.clientLogin.cloudflare.description"/> <a onClick={ this.openLinkInWindow.bind(this, signupLinkWithUTM) }>cloudflare.com</a>.</p>
                                        <p style={{ textAlign: 'center', marginBottom: '2.5rem' }}><FormattedMessage id="component.clientLogin.form.apiKeyHelp"/> <a onClick={ this.openLinkInWindow.bind(this, accountLinkWithUTM) }>here</a>.</p>
                                    </LayoutColumn>
                                </LayoutRow>
                            </div>
                        </LayoutContainer>
                    </Form>
                </div>
                <MarketingFeatureCollection/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        config: state.config.config
    };
}


export default injectIntl(connect(mapStateToProps)(ClientLoginPage));