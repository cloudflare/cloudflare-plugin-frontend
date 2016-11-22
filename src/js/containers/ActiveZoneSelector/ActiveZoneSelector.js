import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import _ from 'lodash';

import Select from 'cf-component-select';
import { notificationAddWarning } from '../../actions/notifications';
import { getConfigValue } from '../../selectors/config';
import { asyncZoneSetActiveZone } from '../../actions/activeZone';
import { isSubdomain } from '../../utils/utils';

class ActiveZoneSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subdomainChecked: false,
        };
    }

    handleChange(zoneName) {
        let { dispatch, zoneList } = this.props;

        _.values(zoneList).forEach(zone => {
            if(zone.name === zoneName) {
                dispatch(asyncZoneSetActiveZone(zone));
            }
        });
    }

    componentWillReceiveProps() {
        let { activeZoneName, config, dispatch } = this.props;

        // If the current active zone is a subdomain show a notification
        // regarding that the changes are made to the original zone.
        var shouldUseSubdomain = getConfigValue(config, 'isSubdomainCheckEnabled');
        if (shouldUseSubdomain && !this.state.subdomainChecked && isSubdomain(activeZoneName)) {
            this.setState({ subdomainChecked: true });
            dispatch(notificationAddWarning('warning.usingSubdomain', true, true));
        }        
    }

    render() {
        let { activeZoneName, zoneList } = this.props;
        let zones = _.values(zoneList).map(zone => {
            return { value: zone.name, label: zone.name };
        });

        let isSingleZone = zones.length < 2;

        return (
            <div className={"active-zone-selector__" + (isSingleZone ? "singlezone" : "multiplezone")} style={{ lineHeight: "60px" }}>
                { isSingleZone ? activeZoneName : 
                    ( <Select
                        value={ activeZoneName }
                        options={ zones }
                        onChange={ this.handleChange.bind(this) } /> )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneName: state.activeZone.name,
        zoneList: state.zones.entities.zones,
        config: state.config,
    };
}

export default injectIntl(connect(mapStateToProps)(ActiveZoneSelector));