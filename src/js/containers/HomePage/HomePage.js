import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { notificationAddWarning, notificationRemove } from '../../actions/notifications';
import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { getZoneSettingsValueForZoneId } from '../../selectors/zoneSettings';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';

class HomePage extends Component {

    componentDidUpdate() {
        let { notifications, developmentmode, dispatch } = this.props;

        var notificationKey = null;
        _.forEach(notifications, function(notification) {
            if (notification["level"] === "warning" && notification["message"] === "warning.developmentmode") {
                notificationKey = notification["key"];
            }
        });

        if (developmentmode === "on" && notificationKey === null) {
            dispatch(notificationAddWarning('warning.developmentmode', true, true));
        } 

        if (developmentmode === "off" && notificationKey !== null) {
            dispatch(notificationRemove(notificationKey));
        }
    }

    render() {
        let { activeZoneId, config, zoneSettings } = this.props;
        let isEmpty = _.isEmpty(zoneSettings[activeZoneId]) && _.isEmpty(getPluginSettingsForZoneId(activeZoneId, this.state));

        return (
            <div>
                {isEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isEmpty && (
                    <div>
                        <Heading size={1}><FormattedMessage id="container.appNavigation.home"/></Heading>
                        
                        { renderCards(config.homePageCards) }
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        config: state.config.config,
        zoneSettings: state.zoneSettings.entities,
        notifications: state.notifications,
        developmentmode: getZoneSettingsValueForZoneId(state.activeZone.id, "development_mode", state),
    };
}
export default injectIntl(connect(mapStateToProps)(HomePage));