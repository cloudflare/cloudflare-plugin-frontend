import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

import { isLoggedIn } from '../../utils/Auth/Auth';
import { HOME_PAGE } from '../../constants/UrlPaths.js';
import { getConfigValue } from '../../selectors/config';
import ClientLoginPage from '../../containers/ClientLoginPage/ClientLoginPage';
import HostLoginPage from '../../containers/HostLoginPage/HostLoginPage';

class LoginPage extends Component {

    componentWillMount() {
        let { dispatch } = this.props;
        if(isLoggedIn()) {
            dispatch(routeActions.push(HOME_PAGE));
        }
    }

    render() {
        const { config } = this.props;
        let isHostAPILogin = getConfigValue(config, 'useHostAPILogin');
        return (
            <div>
                {isHostAPILogin ? (<HostLoginPage/>) : (<ClientLoginPage/>)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { config: state.config };
}

export default connect(mapStateToProps)(LoginPage);