import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId } from '../../selectors/pluginSettings';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import Toggle from 'cf-component-toggle';

const SETTING_NAME = "waf";
const MINIMUM_PLAN = "Pro Plan";

class WAFCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? "on" : "off");
        dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() {
    	let { activeZone, config, zones } = this.props;
    	let zone;
        if(!_.isEmpty(activeZone.name)) {
            zone = zones[activeZone.name];
        }

        zone.plan.name = "Pro Plan";

        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.waf.title'})}>
                            <p><FormattedMessage id="container.waf.description" /></p>
                        </CardContent>
                        <CustomCardControl minimumPlan={ MINIMUM_PLAN } currentPlan={ zone.plan.name }>
                            <Toggle
                                label=""
                                value={(this.props.WAFValue == "on")}
                                onChange={this.handleChange.bind(this)}/>
                        </CustomCardControl>
                    </CardSection>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        WAFValue: state.zoneSettings.entities[state.activeZone.id][SETTING_NAME].value,
		activeZone: state.activeZone,
        zones: state.zones.entities.zones,
    }
}
export default injectIntl(connect(mapStateToProps)(WAFCard));
