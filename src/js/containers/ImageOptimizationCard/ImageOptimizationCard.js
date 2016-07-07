import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId } from '../../selectors/pluginSettings';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { PRO_PLAN } from '../../constants/Plans.js';
import Toggle from 'cf-component-toggle';

const SETTING_NAME_MIRAGE = "mirage";
const SETTING_NAME_POLISH = "polish";
const MINIMUM_PLAN = PRO_PLAN;

class ImageOptimizationCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? "on" : "off");
        dispatch(asyncZoneUpdateSetting(SETTING_NAME_MIRAGE, activeZoneId, value));
        dispatch(asyncZoneUpdateSetting(SETTING_NAME_POLISH, activeZoneId, value));
    }

    render() {
    	let { activeZone, config, zones } = this.props;
    	let zone;
        if(!_.isEmpty(activeZone.name)) {
            zone = zones[activeZone.name];
        }

        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.imageOptimization.title'})}>
                            <FormattedMessage id="container.imageOptimization.description" />
                        </CardContent>
                        <CustomCardControl minimumPlan={ MINIMUM_PLAN } currentPlan={ zone.plan.legacy_id }>
                            <Toggle
                                label=""
                                value={(this.props.imageOptimizationValue == "on")}
                                onChange={this.handleChange.bind(this)}/>
                        </CustomCardControl>
                    </CardSection>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
	var imageOptimizationValue = state.zoneSettings.entities[state.activeZone.id][SETTING_NAME_MIRAGE].value && 
									state.zoneSettings.entities[state.activeZone.id][SETTING_NAME_POLISH].value;
    return {
        activeZoneId: state.activeZone.id,
        imageOptimizationValue: imageOptimizationValue,
		activeZone: state.activeZone,
        zones: state.zones.entities.zones,
    }
}
export default injectIntl(connect(mapStateToProps)(ImageOptimizationCard));
