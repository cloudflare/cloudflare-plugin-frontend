import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId } from '../../selectors/pluginSettings';
import { getZoneSettingsValueForZoneId } from '../../selectors/zoneSettings';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { PRO_PLAN } from '../../constants/Plans.js';
import Toggle from 'cf-component-toggle';

const SETTING_NAME = "waf";
const MINIMUM_PLAN = PRO_PLAN;

class WAFCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? "on" : "off");
        dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() {
    	let { activeZone, zones } = this.props;
    	let zone = zones[activeZone.name];

        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.waf.title'})}>
                            <FormattedMessage id="container.waf.description" />
                        </CardContent>
                        <CustomCardControl minimumPlan={ MINIMUM_PLAN } currentPlan={ zone.plan.legacy_id } indentifier={ SETTING_NAME }>
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
        WAFValue: getZoneSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
		activeZone: state.activeZone,
        zones: state.zones.entities.zones,
    }
}
export default injectIntl(connect(mapStateToProps)(WAFCard));
