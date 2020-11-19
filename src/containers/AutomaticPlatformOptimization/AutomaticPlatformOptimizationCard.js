import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Toggle from 'cf-component-toggle';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getLastModifiedDate, isSubdomain } from '../../utils/utils';
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
    const { activeZoneId, dispatch } = this.props;

    // synchronize Plugin setting with API value
    dispatch(
      asyncPluginUpdateSetting(
        SETTING_NAME,
        activeZoneId,
        this.isFeatureEnabled()
      )
    );
  }

  isFeatureEnabled() {
    const {
      hostname,
      isSubdomain,
      settings: { enabled, hostnames = [] }
    } = this.props;

    if (hostnames.length > 0 || isSubdomain) {
      return enabled && hostnames.includes(hostname);
    }

    return enabled;
  }

  handleDrawerClick(id) {
    this.setState({
      activeDrawer: id === this.state.activeDrawer ? null : id
    });
  }

  handleChange(value) {
    let {
      activeZoneId,
      dispatch,
      settings: { hostnames = [] },
      defaultHostnames
    } = this.props;

    if (value) {
      hostnames.push(...defaultHostnames.filter(h => !hostnames.includes(h)));
    } else {
      _.remove(hostnames, h => defaultHostnames.includes(h));

      // keep feature enabled if there are other hostnames
      if (hostnames.length > 0) {
        value = true;
      }
    }

    dispatch(
      asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, {
        enabled: value,
        cf: true, // the zone is orange clouded
        wordpress: true, // wordpress is detected
        wp_plugin: true, // wp plugin is detected
        hostnames
      })
    );
    dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      modifiedDate,
      entitlements,
      settings: { hostnames = [], enabled },
      defaultHostnames
    } = this.props;

    const automatic_platform_optimization_entitlement =
      entitlements['zone.automatic_platform_optimization'];
    const entitled = _.get(
      automatic_platform_optimization_entitlement,
      'allocation.value',
      false
    );
    const hostnamesMessage = formatMessage(
      { id: 'container.automaticplatformoptimization.description_hostnames' },
      {
        hostnames:
          hostnames.length > 0
            ? hostnames.join(', ')
            : defaultHostnames.join(', ')
      }
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
              <div>
                <FormattedMessage id="container.automaticplatformoptimization.description" />

                {enabled && (
                  <FormattedMarkdown formattedMessage={hostnamesMessage} />
                )}
              </div>
            </CardContent>
            <CustomCardControl
              purchaseSubscription={!entitled}
              purchaseSubscriptionPath={'/speed/optimization/apo/purchase'}
              indentifier={SETTING_NAME}
            >
              <Toggle
                label=""
                value={this.isFeatureEnabled()}
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

function getDefaultHostnames(hostname, isSubdomain) {
  const defaultHostnames = [];
  defaultHostnames.push(hostname);

  if (!isSubdomain) {
    if (hostname.startsWith('www.')) {
      defaultHostnames.push(hostname.substring('www.'.length));
    } else {
      defaultHostnames.push(`www.${hostname}`);
    }
  }

  return defaultHostnames;
}

function mapStateToProps(state) {
  const isSubdomainValue = isSubdomain(state.activeZone.name);
  const hostname = new URL(document.URL).hostname;

  return {
    activeZoneId: state.activeZone.id,
    settings: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getZoneSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    entitlements: state.zoneEntitlements.entities[state.activeZone.id],
    defaultHostnames: getDefaultHostnames(hostname, isSubdomainValue),
    hostname,
    isSubdomain: isSubdomainValue
  };
}

export default injectIntl(
  connect(mapStateToProps)(AutomaticPlatformOptimizationCard)
);
