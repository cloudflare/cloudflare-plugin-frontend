import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Toggle from 'cf-component-toggle';
import {
  Card,
  CardSection,
  CardContent,
  CardControl,
  CardDrawers
} from 'cf-component-card';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getLastModifiedDate } from '../../utils/utils';
import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import _ from 'lodash';

const SETTING_NAME = 'automatic_platform_optimization';

class AutomaticPlatformOptimizationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrawer: null
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  componentDidMount() {
    const { activeZoneId, rewriteValue, dispatch } = this.props;

    // synchronize Plugin setting with API value
    dispatch(
      asyncPluginUpdateSetting(
        SETTING_NAME,
        activeZoneId,
        rewriteValue && rewriteValue.enabled
      )
    );
  }

  handleDrawerClick(id) {
    this.setState({
      activeDrawer: id === this.state.activeDrawer ? null : id
    });
  }

  handleChange(value) {
    let { activeZoneId, dispatch } = this.props;

    dispatch(
      asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, {
        enabled: value
      })
    );
    dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { modifiedDate, entitlements } = this.props;

    const automatic_platform_optimization_entitlement =
      entitlements['zone.automatic_platform_optimization'];
    const entitled = _.get(
      automatic_platform_optimization_entitlement,
      'allocation.value',
      false
    );

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({
                id: 'container.automaticplatformoptimization.title'
              })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage id="container.automaticplatformoptimization.description" />
              </p>
            </CardContent>
            <CustomCardControl
              purchaseSubscription={!entitled}
              purchaseSubscriptionPath={'/speed/optimization/apo/purchase'}
              indentifier={SETTING_NAME}
            >
              <Toggle
                label=""
                value={this.props.rewriteValue.enabled}
                onChange={this.handleChange.bind(this)}
              />
            </CustomCardControl>
          </CardSection>
          <CardDrawers
            onClick={this.handleDrawerClick}
            active={this.state.activeDrawer}
            drawers={[
              {
                id: 'help',
                name: formatMessage({ id: 'container.drawer.help' }),
                content: (
                  <FormattedMarkdown text="container.automaticplatformoptimization.drawer.help" />
                )
              }
            ]}
          />
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZoneId: state.activeZone.id,
    rewriteValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getZoneSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    entitlements: state.zoneEntitlements.entities[state.activeZone.id]
  };
}
export default injectIntl(
  connect(mapStateToProps)(AutomaticPlatformOptimizationCard)
);
