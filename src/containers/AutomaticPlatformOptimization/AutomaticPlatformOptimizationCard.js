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
import { Checkbox } from 'cf-component-checkbox';
import { Icon } from '@cloudflare/component-icon';

const SETTING_NAME = 'automatic_platform_optimization';

const checkboxStyle = {
  marginTop: '1rem'
};

const warningIconStyle = {
  minWidth: '48px',
  padding: '8px',
  marginTop: '16px',
  fill: 'currentcolor',
  color: 'rgb(221, 161, 0)'
};

class AutomaticPlatformOptimizationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrawer: null
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  async componentDidMount() {
    const {
      activeZoneId,
      dispatch,
      settings: {
        hostnames = [],
        cf,
        wordpress,
        wp_plugin,
        enabled,
        cache_by_device_type = false
      },
      defaultHostnames
    } = this.props;

    // synchronize Plugin setting with API value
    dispatch(
      asyncPluginUpdateSetting(
        SETTING_NAME,
        activeZoneId,
        this.isFeatureEnabled()
      )
    );

    if (!cf || !wordpress || !wp_plugin) {
      // init hostnames only if the feature is disabled
      if (!enabled && hostnames.length == 0) {
        hostnames.push(...defaultHostnames);
      }

      // autocorrect APO settings
      dispatch(
        asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, {
          enabled,
          cf: true,
          wordpress: true,
          wp_plugin: true,
          hostnames,
          cache_by_device_type
        })
      );
    }

    await this.recheckAPOHeader();
  }

  async recheckAPOHeader() {
    let hasAPOHeader = await apoHeaderIsPresent();
    this.setState({
      hasAPOHeader
    });
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
      settings: {
        hostnames = [],
        cf,
        wordpress,
        wp_plugin,
        enabled,
        cache_by_device_type = false
      },
      defaultHostnames,
      isSubdomain
    } = this.props;

    if (enabled) {
      if (value) {
        // extend hostnames when APO was enabled already
        hostnames.push(...defaultHostnames.filter(h => !hostnames.includes(h)));
      } else {
        _.remove(hostnames, h => defaultHostnames.includes(h));

        // keep feature enabled if there are other hostnames
        if (hostnames.length > 0) {
          value = true;
        }
      }
    } else {
      if (value) {
        // override hostnames when APO was disabled
        hostnames = [...defaultHostnames];
      }
    }

    dispatch(
      asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, {
        enabled: value,
        cf: isSubdomain ? cf : true, // the zone is orange clouded, override only on the root
        wordpress: isSubdomain ? wordpress : true, // wordpress is detected, override only on the root
        wp_plugin: isSubdomain ? wp_plugin : true, // wp plugin is detected, override only on the root
        hostnames,
        cache_by_device_type
      })
    );
    dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
  }

  handleCacheByDeviceTypeChange() {
    let {
      activeZoneId,
      dispatch,
      settings: {
        hostnames = [],
        cf,
        wordpress,
        wp_plugin,
        enabled,
        cache_by_device_type = false
      }
    } = this.props;

    dispatch(
      asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, {
        enabled,
        cf,
        wordpress,
        wp_plugin,
        hostnames,
        cache_by_device_type: !cache_by_device_type
      })
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { hasAPOHeader } = this.state;
    const {
      modifiedDate,
      entitlements,
      settings: {
        hostnames = [],
        enabled,
        wp_plugin,
        cache_by_device_type = false
      },
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
                <FormattedMarkdown text="container.automaticplatformoptimization.drawer.help" />
                <FormattedMarkdown text="container.automaticplatformoptimization.cache_by_device_type_note" />
                {enabled && (
                  <FormattedMarkdown formattedMessage={hostnamesMessage} />
                )}
                {!hasAPOHeader && entitled && (
                  <div style={{ display: 'flex' }}>
                    <div style={warningIconStyle}>
                      <Icon type="exclamation-sign" />
                    </div>
                    <span>
                      <FormattedMarkdown text="container.automaticplatformoptimization.apo_header_note" />
                      <a onClick={() => this.recheckAPOHeader()} href="#">
                        Check again.
                      </a>
                    </span>
                  </div>
                )}
                {enabled && !wp_plugin && (
                  <div style={{ display: 'flex' }}>
                    <div style={warningIconStyle}>
                      <Icon type="exclamation-sign" />
                    </div>
                    <span>
                      <FormattedMarkdown text="container.automaticplatformoptimization.apo_configuration_note" />
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
            <CustomCardControl
              purchaseSubscription={!entitled}
              purchaseSubscriptionPath={'/speed/optimization/apo/purchase'}
              indentifier={SETTING_NAME}
            >
              <div>
                <Toggle
                  label=""
                  value={this.isFeatureEnabled()}
                  onChange={this.handleChange.bind(this)}
                />
                <div style={checkboxStyle}>
                  <Checkbox
                    name={''}
                    value={''}
                    label={formatMessage({
                      id:
                        'container.automaticplatformoptimization.cache_by_device_type'
                    })}
                    checked={!!cache_by_device_type}
                    onChange={this.handleCacheByDeviceTypeChange.bind(this)}
                    disabled={!enabled}
                  />
                </div>
              </div>
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

async function apoHeaderIsPresent() {
  try {
    let origin = new URL(document.URL).origin;
    let res = await fetch(origin);
    return res.headers.has('cf-edge-cache');
  } catch (err) {
    console.warn(err);
    return false;
  }
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
