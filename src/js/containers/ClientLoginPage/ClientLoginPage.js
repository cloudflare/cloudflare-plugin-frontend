import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import { routeActions } from 'redux-simple-router'

import MarketingFeatureCollection from '../../containers/MarketingFeatureCollection/MarketingFeatureCollection';
import { asyncAPILogin } from '../../actions/user'
import { CLOUDFLARE_API_KB_ARTICLE_PAGE, CLOUDFLARE_SIGNUP_PAGE } from '../../constants/UrlPaths.js'

class ClientLoginPage extends Component {

    handleLoginSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;
        let email = this.refs.email.value;
        let apiKey = this.refs.apiKey.value;

        dispatch(asyncAPILogin(email,apiKey));
    }

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <section className="center login-form">
                    <div className="login-container">
                        <form className="form" onSubmit={(e) => this.handleLoginSubmit(e)}>
                            <legend>
                                <h3 className="form-title">
                                    <FormattedMessage id="component.clientLogin.form.title" />
                                </h3>
                            </legend>
                            <fieldset>
                                <div className="control-group">
                                    <div className="control-label">
                                        <label className="assistive-text">
                                            <FormattedMessage id="component.clientLogin.form.email" />
                                        </label>
                                    </div>
                                    <div className="controls">
                                        <input ref="email" type="text" placeholder={formatMessage({id: "component.clientLogin.form.email"})} className="width-full"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="control-label">
                                        <label className="assistive-text">
                                            <FormattedMessage id="component.clientLogin.form.apiKey" />
                                        </label>
                                    </div>
                                    <div className="controls">
                                        <input ref="apiKey" type="text" placeholder={formatMessage({id: "component.clientLogin.form.apiKey"})} className="width-full"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button type="submit" className="btn btn-success btn-large width-full">
                                            <FormattedMessage id="component.clientLogin.form.button" />
                                        </button>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="row">
                                        <a className="pull-right" href={ CLOUDFLARE_API_KB_ARTICLE_PAGE } target="_blank"><FormattedMessage id="component.clientLogin.form.apiKeyHelp" /></a>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </section>
                <div className="row">
                    <div className="col-16">
                        <p style={{'textAlign': 'center', 'marginBottom': '2.5rem'}}><FormattedMessage id="component.clientLogin.cloudflare.description"/> <a href={CLOUDFLARE_SIGNUP_PAGE} target="_blank">CloudFlare.com</a>.</p>
                    </div>
                </div>
                <MarketingFeatureCollection/>
            </div>
        );
    }
}

export default injectIntl(connect()(ClientLoginPage));