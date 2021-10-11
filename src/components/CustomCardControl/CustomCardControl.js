import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CardControl } from 'cf-component-card';
import { Button } from 'cf-component-button';
import {
  planNeedsUpgrade,
  getLocalizedPlanId,
  FREE_PLAN,
  getPlanUpdateParam
} from '../../constants/Plans.js';
import { getConfigValue } from '../../selectors/config.js';
import { openWindow720x720 } from '../../utils/utils.js';

class CustomCardControl extends Component {
  render() {
    let {
      activeZone,
      purchaseSubscription,
      purchaseSubscriptionPath
    } = this.props;

    if (purchaseSubscription && purchaseSubscriptionPath) {
      let upgradeLink = `https://dash.cloudflare.com/${activeZone.account.id}/${activeZone.name}${purchaseSubscriptionPath}`;
      return (
        <CardControl>
          {purchaseSubscription ? (
            <Button
              type="primary"
              onClick={openWindow720x720.bind(this, upgradeLink)}
            >
              <FormattedMessage id="component.customcardcontrol.purchase" />
            </Button>
          ) : (
            this.props.children
          )}
        </CardControl>
      );
    }

    var currentPlan = this.props.hasOwnProperty('currentPlan')
      ? this.props.currentPlan
      : FREE_PLAN;
    var minimumPlan = this.props.hasOwnProperty('minimumPlan')
      ? this.props.minimumPlan
      : FREE_PLAN;
    var needToUpgrade = planNeedsUpgrade(currentPlan, minimumPlan);
    var localizedPlanId = getLocalizedPlanId(minimumPlan);

    // Upgrade Plan Page can get the following parameters
    // /a/upgrade-plan?pt=[f|p|b|]
    let upgradeLink = `https://dash.cloudflare.com?to=/:account/${activeZone.name}/update-plan`;
    upgradeLink += '&pt=' + getPlanUpdateParam(minimumPlan);

    return (
      <CardControl>
        {needToUpgrade ? (
          <Button
            type="primary"
            onClick={openWindow720x720.bind(this, upgradeLink)}
          >
            <FormattedMessage id="component.customcardcontrol.upgrade" />{' '}
            <FormattedMessage id={localizedPlanId} />
          </Button>
        ) : (
          this.props.children
        )}
      </CardControl>
    );
  }
}

CustomCardControl.propTypes = {
  name: PropTypes.string,
  indentifier: PropTypes.string.isRequired,
  integrationName: PropTypes.string,
  activeZone: PropTypes.object.isRequired,
  currentPlan: PropTypes.string,
  minimumPlan: PropTypes.string,
  purchaseSubscription: PropTypes.bool,
  purchaseSubscriptionPath: PropTypes.string,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
    integrationName: getConfigValue(state.config, 'integrationName'),
    activeZone: state.activeZone
  };
}
export default injectIntl(connect(mapStateToProps)(CustomCardControl));
