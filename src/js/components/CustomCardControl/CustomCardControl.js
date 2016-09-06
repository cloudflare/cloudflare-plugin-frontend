import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CardControl } from 'cf-component-card';
import { Button } from 'cf-component-button';
import { CLOUDFLARE_UPGRADE_PAGE } from '../../constants/UrlPaths.js';
import { planNeedsUpgrade, getLocalizedPlanId, FREE_PLAN } from '../../constants/Plans.js';
import { getConfigValue } from '../../selectors/config.js';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';

class CustomCardControl extends Component {

    render() {
        let { integrationName } = this.props;

        var currentPlan = this.props.hasOwnProperty('currentPlan') ? this.props.currentPlan : FREE_PLAN;
        var minimumPlan = this.props.hasOwnProperty('minimumPlan') ? this.props.minimumPlan : FREE_PLAN;
        var needToUpgrade = planNeedsUpgrade(currentPlan, minimumPlan);
        var localizedPlanId = getLocalizedPlanId(minimumPlan);


        let upgradeLinkWithUTM = generateUTMLink(CLOUDFLARE_UPGRADE_PAGE, integrationName, integrationName, this.props.indentifier);
        
        return (
            <CardControl>
                { needToUpgrade ? (
                        <Button type="primary" onClick={ function(){window.open(upgradeLinkWithUTM); return false;}}>
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
    };
}
export default injectIntl(connect(mapStateToProps)(CustomCardControl));
