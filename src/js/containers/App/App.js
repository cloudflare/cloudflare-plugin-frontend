import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import { GatewayDest, GatewayProvider } from 'react-gateway';

import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';

import ActiveZoneSelector from '../../containers/ActiveZoneSelector/ActiveZoneSelector';
import AppNavigation from '../../containers/AppNavigation/AppNavigation';
import { isLoggedIn } from '../../utils/Auth/Auth';
import { asyncConfigFetch } from '../../actions/config';
import GlobalNotifications from '../../containers/GlobalNotifications/GlobalNotifications';
import UnderAttackButton from '../../containers/UnderAttackButton/UnderAttackButton';
import { getAbsoluteUrl } from '../../selectors/config';

//Safari Intl Polyfill
if (!global.Intl) {
    require('intl');
}
class AppContainer extends Component {


    render() {
        const { config } = this.props.state;
        return (
            <div>
                <LayoutContainer>
                    <LayoutRow>
                        <header id="header" className="header app-header">
                            <div className="gradient-bar-header">
                                <div className="header-main" style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
                                    <LayoutColumn width={3/8}>
                                        <LayoutColumn width={3/8}>
                                            <img style={{ margin: "4.95px auto 0", width: "170px", height: "30px" }} src={ getAbsoluteUrl(config, 'assets/logo.svg') } />
                                        </LayoutColumn>
                                        <LayoutColumn width={5/8}>
                                            { isLoggedIn() ? <ActiveZoneSelector/> : <noscript/> }                                            
                                        </LayoutColumn>
                                    </LayoutColumn>     
                                    <LayoutColumn width={5/8}>
                                        <div style={{ float: "right" }}>
                                            { (isLoggedIn() && this.props.state.zoneSettings.entities[this.props.state.activeZone.id]) ? <UnderAttackButton/> : <noscript/> }
                                        </div>
                                    </LayoutColumn>
                                </div>
                            </div>
                        </header>
                    </LayoutRow>

                    <div style={{ marginTop: "-8px" }}>
                        <LayoutRow>
                            <div style={{ display: "flex", padding: "1rem", backgroundColor: "#FFF" }}>
                                <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                                <LayoutColumn width={1/3}>
                                    <AppNavigation />
                                </LayoutColumn>
                                <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                            </div>
                        </LayoutRow>
                    </div>

                    <LayoutRow>
                        <LayoutColumn width={3/20}>&nbsp;</LayoutColumn>
                        <LayoutColumn width={14/20}>
                            {this.props.children}
                        </LayoutColumn>
                        <LayoutColumn width={3/20}>&nbsp;</LayoutColumn>
                    </LayoutRow>
                    <LayoutRow>
                        <LayoutColumn width={1/1}>
                            <p style={{ 'textAlign': 'center' }}><FormattedMessage id="container.App.version" values={{ 'version': this.props.state.config.config.version }}/></p>
                        </LayoutColumn>
                    </LayoutRow>
                </LayoutContainer>
                <GatewayDest name="modal"/>
                <GlobalNotifications />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { state: state };
}

// <IntlProvider> must be instantiated before injectIntl() is used so we wrap AppContainer in AppWrapper
const App = injectIntl(connect(mapStateToProps)(AppContainer));

class AppWrapper extends React.Component {
    componentWillMount() {
        let { dispatch } = this.props;
        dispatch(asyncConfigFetch());
    }

    render() {
        if (this.props.state.app.isInitialized) {
            return (
                <IntlProvider locale={this.props.state.intl.locale} messages={this.props.state.intl.translations}>
                    <GatewayProvider>
                        <App>{this.props.children}</App>
                    </GatewayProvider>
                </IntlProvider>
            );
        } 

        return <noscript/>;
    }
}

export default connect(mapStateToProps)(AppWrapper);