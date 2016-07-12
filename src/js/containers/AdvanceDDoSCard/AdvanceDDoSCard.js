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

const MINIMUM_PLAN = PRO_PLAN;

class AdvanceDDoSCard extends Component {
    render() {
    	let { activeZone, zones } = this.props;
    	let zone = zones[activeZone.name];
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.advanceddos.title'})}>
                            <FormattedMessage id="container.advanceddos.description" />
                        </CardContent>
                        <CustomCardControl minimumPlan={ MINIMUM_PLAN } currentPlan={ zone.plan.legacy_id }>
                            <FormattedMessage id="container.advanceddos.value" />
                        </CustomCardControl>
                    </CardSection>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
		activeZone: state.activeZone,
        zones: state.zones.entities.zones,
    }
}
export default injectIntl(connect(mapStateToProps)(AdvanceDDoSCard));
