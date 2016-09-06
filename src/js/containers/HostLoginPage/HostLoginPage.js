import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router';

import MarketingFeatureCollection from '../../containers/MarketingFeatureCollection/MarketingFeatureCollection';
import * as UserActionCreators from '../../actions/user';
import { SIGN_UP_PAGE, CLOUDFLARE_FORGOT_PASSWORD_PAGE } from '../../constants/UrlPaths.js';

class HostLoginPage extends Component {

    handleLoginSubmit(e) {
        e.preventDefault();

        const { dispatch } = this.props;
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        dispatch(UserActionCreators.asyncLogin(email,password));
    }

    handleLogout() {
        let { dispatch } = this.props;
        dispatch(UserActionCreators.logout());
    }

    render() {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <section className="center login-form">
                    <div className="login-container">
                        <form className="form" onSubmit={ this.handleLoginSubmit.bind(this)}>
                            <legend>
                                <h3 className="form-title">
                                    <FormattedMessage id="component.login.form.title" />
                                </h3>
                            </legend>
                            <fieldset>
                                <div className="control-group">
                                    <div className="control-label">
                                        <label className="assistive-text">
                                            <FormattedMessage id="component.login.form.email" />
                                        </label>
                                    </div>
                                    <div className="controls">
                                        <input ref="email" type="text" placeholder={formatMessage({ id: 'component.login.form.email' })} className="width-full"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="control-label">
                                        <label className="assistive-text">
                                            <FormattedMessage id="component.login.form.password" />
                                        </label>
                                    </div>
                                    <div className="controls">
                                        <input ref="password" type="password" placeholder={formatMessage({ id: 'component.login.form.password' })} className="width-full"/>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="controls">
                                        <button type="submit" className="btn btn-success btn-large width-full">
                                            <FormattedMessage id="component.login.form.button" />
                                        </button>
                                    </div>
                                </div>
                                <div className="control-group">
                                    <div className="row">
                                        <Link className="pull-left" to={ SIGN_UP_PAGE }><FormattedMessage id="component.login.form.signUp" /></Link>
                                        <a className="pull-right" href={ CLOUDFLARE_FORGOT_PASSWORD_PAGE } target="_blank"><FormattedMessage id="component.login.form.forgotPassword" /></a>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </section>
                <div className="row">
                    <div className="col-16">
                        <p style={{ 'textAlign': 'center', 'marginBottom': '2.5rem' }}><FormattedMessage id="component.login.cloudflare.description"/></p>
                    </div>
                </div>
                <MarketingFeatureCollection/>
            </div>
        );
    }
}

export default injectIntl(connect()(HostLoginPage));