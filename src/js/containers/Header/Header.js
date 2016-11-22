import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import ActiveZoneSelector from '../../containers/ActiveZoneSelector/ActiveZoneSelector';
import { isLoggedIn } from '../../utils/Auth/Auth';
import { getAbsoluteUrl } from '../../selectors/config';
import { LayoutRow, LayoutColumn } from 'cf-component-layout';
import UnderAttackButton from '../../containers/UnderAttackButton/UnderAttackButton';

class Header extends Component {

    render() {
        let { config, activeZone, zoneSettings } = this.props;

        return(
            <header id="header" className="header app-header">
                <div className="gradient-bar-header"></div>
                <div id="header-global" className="header-main">
                    <div className="header-global-wrapper">
                        <LayoutRow>
                            <LayoutColumn width={1/8}>
                                <img style={{ margin: "15px 0", width: "170px", height: "30px" }} src={ getAbsoluteUrl(config, 'assets/logo.svg') } />
                            </LayoutColumn>
                            <LayoutColumn width={1/8}>
                                <ActiveZoneSelector/>
                            </LayoutColumn>
                            <LayoutColumn width={6/8}>
                                { (isLoggedIn() && zoneSettings.entities[activeZone.id]) ? <UnderAttackButton/> : null }
                            </LayoutColumn>
                        </LayoutRow>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        config: state.config,
        activeZone: state.activeZone,
        zoneSettings: state.zoneSettings,
    };
}

export default injectIntl(connect(mapStateToProps)(Header));