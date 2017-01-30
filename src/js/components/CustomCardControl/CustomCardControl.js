import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CardControl } from 'cf-component-card';
import { Button } from 'cf-component-button';
import { CLOUDFLARE_UPGRADE_PAGE } from '../../constants/UrlPaths.js';
import { planNeedsUpgrade, getLocalizedPlanId, FREE_PLAN } from '../../constants/Plans.js';
import { getConfigValue } from '../../selectors/config.js';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';
import { openWindow720x720 } from '../../utils/utils.js';

class CustomCardControl extends Component {

    render() {
        let { integrationName, activeZone } = this.props;

        var currentPlan = this.props.hasOwnProperty('currentPlan') ? this.props.currentPlan : FREE_PLAN;
        var minimumPlan = this.props.hasOwnProperty('minimumPlan') ? this.props.minimumPlan : FREE_PLAN;
        var needToUpgrade = planNeedsUpgrade(currentPlan, minimumPlan);
        var localizedPlanId = getLocalizedPlanId(minimumPlan);

        let upgradeLinkWithUTM = generateUTMLink(CLOUDFLARE_UPGRADE_PAGE + "/" + activeZone.name, integrationName, integrationName, this.props.indentifier);

        // Upgrade Plan Page can get the following parameters
        // /a/upgrade-plan?plan=[free|pro|business|enterprise]
        // since we added UTM code we are appending with '&'
        upgradeLinkWithUTM += "&plan=" + minimumPlan
        
        return (
            <CardControl>
                { needToUpgrade ? (
                        <Button type="primary" onClick={ openWindow720x720.bind(this, upgradeLinkWithUTM) }>
                            <FormattedMessage id="component.customcardcontrol.upgrade" /> <FormattedMessage id={ localizedPlanId } />
                        </Button> 
                    ) :
                    this.props.children
                }
            </CardControl>
        );
    }
}

CustomCardControl.propTypes = {
    name: PropTypes.string,
    indentifier: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
    return {
        integrationName: getConfigValue(state.config, 'integrationName'),
        activeZone: state.activeZone,
    };
}
export default injectIntl(connect(mapStateToProps)(CustomCardControl));
