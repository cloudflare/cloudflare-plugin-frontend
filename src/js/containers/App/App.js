import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
import { GatewayDest, GatewayProvider } from 'react-gateway';

import { Flex, FlexItem } from 'cf-component-flex';

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
            <div className="wrapper">
                <Flex spacing="wide">
                    <FlexItem>
                        &nbsp;
                    </FlexItem>
                    <FlexItem>
                        <img src={ getAbsoluteUrl(config, "assets/logo.svg") } />
                    </FlexItem>
                    <FlexItem>
                        &nbsp;
                    </FlexItem>
                </Flex>
                <Flex spacing="wide">
                    <FlexItem>
                        { isLoggedIn() ? <ActiveZoneSelector/> : <noscript/> }
                    </FlexItem>
                    <FlexItem>
                        &nbsp;
                    </FlexItem>
                    <FlexItem>
                        { (isLoggedIn() && this.props.state.zoneSettings.entities[this.props.state.activeZone.id]) ? <UnderAttackButton/> : <noscript/> }
                    </FlexItem>
                </Flex>
                <Flex spacing="wide">
                    <FlexItem>
                        <div className="apps-nav secondary-nav" id="zone-nav">
                            <div role="navigation" className="wrapper" id="zone-nav-container">
                                <AppNavigation />
                            </div>
                        </div>
                    </FlexItem>
                </Flex>
                <Flex spacing="wide">
                    <FlexItem>
                        {this.props.children}
                    </FlexItem>
                </Flex>
                <Flex spacing="wide">
                    <FlexItem>
                        <p style={{'textAlign': 'center'}}><FormattedMessage id="container.App.version" values={{'version': this.props.state.config.config.version }}/></p>
                    </FlexItem>
                </Flex>
                <GatewayDest name="modal"/>
                <GlobalNotifications />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { state: state }
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
        } else {
            return <noscript/>;
        }
    }
}

export default connect(mapStateToProps)(AppWrapper);