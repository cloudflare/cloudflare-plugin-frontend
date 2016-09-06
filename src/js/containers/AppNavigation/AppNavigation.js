import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { routeActions } from 'redux-simple-router';

import AppNavigationLiNode from '../../components/AppNavigationLiNode/AppNavigationLiNode';
import * as UrlPaths from '../../constants/UrlPaths';
import { isLoggedIn } from '../../utils/Auth/Auth';
import { isDNSPageEnabled } from '../../selectors/config';

class AppNavigation extends Component {

    handleClick(path) {
        let { dispatch } = this.props;
        dispatch(routeActions.push(path));
    }

    render() {
        /*
         * Hard coding these styles until WWW creates a component for this.
         */
        //className="slider-nav-container apps-nav-container no-arrows" id="app-nav"
        let ulStyles = {
            listStyle: 'none',
            margin: '0',
            tableLayout: 'fixed',
            width: '100%',
            textAlign: 'center',
        };

        //className="svg-main"
        let pathStyles = {
            fill: '#FFF',
            transition: 'all 0.2s ease',
        };

        let { config } = this.props;

        return((isLoggedIn() && (
                <ul style={ulStyles}>
                    <AppNavigationLiNode onClick={() => this.handleClick(UrlPaths.HOME_PAGE)} title="container.appNavigation.home">
                        <path style={pathStyles} stroke="white" d="M36 21.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM32 21v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                    </AppNavigationLiNode>
                    { isDNSPageEnabled(config) ?
                        <AppNavigationLiNode onClick={() => this.handleClick(UrlPaths.DOMAINS_OVERVIEW_PAGE)} title="container.appNavigation.domainsOverview">
                            <path style={pathStyles} d="M24,12h-8v-2h8V12z M30,12v18H10V12h4v2h12v-2H30z M16,23h-3v3h3V23z M16,18h-3v3h3V18z M27,23h-9v3h9V23z M27,18h-9v3h9V18z"></path>
                        </AppNavigationLiNode>
                        : null }
                    <AppNavigationLiNode onClick={() => this.handleClick(UrlPaths.MORE_SETTINGS_PAGE)} title="container.appNavigation.moresettings">
                        <path style={pathStyles} d="M30,13l-6,6l-3-3l6-6h-7l-4,4v5l-6,6.1l4.9,4.9l6.1-6h5l4-4V13z"></path>
                    </AppNavigationLiNode>
                    <AppNavigationLiNode onClick={() => this.handleClick(UrlPaths.ANALYTICS_PAGE)} title="container.appNavigation.analytics">
                        <path style={pathStyles} d="M21,12.7V21h-8.3c0,5,3.9,8.9,8.7,8.9c4.8,0,8.5-3.8,8.5-8.6C29.9,16.5,26,12.7,21,12.7z"></path>
                        <path style={pathStyles} d="M19,19v-8.9c-5,0.5-8.4,4.5-8.9,8.9H19z"></path>
                    </AppNavigationLiNode>
                </ul>
            ))
        );
    }
}

AppNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return { 
        config: state.config,
    };
}

export default injectIntl(connect(mapStateToProps)(AppNavigation));