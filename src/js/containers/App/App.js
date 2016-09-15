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
                        <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                        <LayoutColumn width={1/3}>
                            <img src={ getAbsoluteUrl(config, 'assets/logo.svg') } />
                        </LayoutColumn>
                        <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                    </LayoutRow>
                    <LayoutRow>
                        <LayoutColumn width={1/4}>
                            { isLoggedIn() ? <ActiveZoneSelector/> : <noscript/> }
                        </LayoutColumn>
                        <LayoutColumn width={2/4}>&nbsp;</LayoutColumn>
                        <LayoutColumn width={1/4}>
                            { (isLoggedIn() && this.props.state.zoneSettings.entities[this.props.state.activeZone.id]) ? <UnderAttackButton/> : <noscript/> }
                        </LayoutColumn>
                    </LayoutRow>
                    <LayoutRow>
                        <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                        <LayoutColumn width={1/3}>
                            <AppNavigation />
                        </LayoutColumn>
                        <LayoutColumn width={1/3}>&nbsp;</LayoutColumn>
                    </LayoutRow>
                    <LayoutRow>
                        <LayoutColumn width={1/5}>&nbsp;</LayoutColumn>
                        <LayoutColumn width={3/5}>
                            {this.props.children}
                        </LayoutColumn>
                        <LayoutColumn width={1/5}>&nbsp;</LayoutColumn>
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