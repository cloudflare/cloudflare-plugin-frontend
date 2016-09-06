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
        let { activeZone, config, dispatch } = this.props;

        var shouldUseSubdomain = getConfigValue(config, 'isSubdomainCheckEnabled');
        if (shouldUseSubdomain && !this.state.subdomainChecked && isSubdomain(activeZone.name)) {
            this.setState({ subdomainChecked: true });
            dispatch(notificationAddWarning('warning.usingSubdomain', true, true));
        }        
    }

    render() {
        let { activeZone, intl, zoneList } = this.props;
        let zones = _.values(zoneList).map(zone => {
            return { value: zone.name, label: zone.name };
        });

        return (
            <div>
                <Select
                    label={ intl.formatMessage({ id: 'container.activeZoneSelector.activeZone' }) }
                    value={ activeZone.name }
                    options={ zones }
                    onChange={ this.handleChange.bind(this) } />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZone: state.activeZone,
        zoneList: state.zones.entities.zones,
        config: state.config,
    };
}

export default injectIntl(connect(mapStateToProps)(ActiveZoneSelector));