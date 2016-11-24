import React from 'react';
import { Route, IndexRoute } from 'react-router';
import * as UrlPaths from './constants/UrlPaths';
import { isLoggedIn } from './utils/Auth/Auth';

/* containers */
import AnalyticsPage from './containers/AnalyticsPage/AnaltyicsPage';
import App from './containers/App/App';
import DNSManagementPage from './containers/DNSManagementPage/DNSManagementPage';
import Login from './containers/LoginPage/LoginPage';
import SignUpPage from './containers/SignUpPage/SignUpPage';
import HomePage from './containers/HomePage/HomePage';
import MoreSettingsPage from './containers/MoreSettingsPage/MoreSettingsPage';

function requireAuth(nextState, replaceState) {
    if (!isLoggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, UrlPaths.LOGIN_PAGE);
    }
}

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Login } />
        <Route path={ UrlPaths.LOGIN_PAGE } component={ Login } />
        <Route path={ UrlPaths.SIGN_UP_PAGE } component= { SignUpPage } />
        <Route path={ UrlPaths.HOME_PAGE } component={ HomePage } onEnter={ requireAuth } />
        <Route path={ UrlPaths.ANALYTICS_PAGE } component={ AnalyticsPage } onEnter={ requireAuth } />
        <Route path={ UrlPaths.DOMAINS_OVERVIEW_PAGE } component={ DNSManagementPage } onEnter={ requireAuth } />
        <Route path={ UrlPaths.MORE_SETTINGS_PAGE } component={ MoreSettingsPage } onEnter={ requireAuth } />
    </Route>
);