import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import Toggle from 'cf-component-toggle';

import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import { ENT_PLAN } from '../../constants/Plans.js';
import { getZonePlanLegacyId } from '../../selectors/zones';
import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import {
  getPluginSettingsValueForZoneId,
  getPluginSettingsModifiedDateForZoneId
} from '../../selectors/pluginSettings';
import { getLastModifiedDate } from '../../utils/utils';

const SETTING_NAME = 'plugin_specific_cache_tag';

class PluginSpecificCacheTagCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrawer: null
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  handleDrawerClick(id) {
    this.setState({
      activeDrawer: id === this.state.activeDrawer ? null : id
    });
  }

  handleChange(value) {
    let { activeZoneId, dispatch } = this.props;
    value = value === true ? 'on' : 'off';
    dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
  }

  render() {
    const { formatMessage } = this.props.intl;
    let { modifiedDate } = this.props;

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({
                id: 'container.pluginSpecificCacheTagCard.title'
              })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage
                  id="container.pluginSpecificCacheTagCard.description"
                  values={{ integrationName: this.props.integrationName }}
                />
              </p>
            </CardContent>
            <CustomCardControl
              minimumPlan={ENT_PLAN}
              currentPlan={this.props.activeZonePlan}
              indentifier={SETTING_NAME}
            >
              <Toggle
                label=""
                value={this.props.cacheTagCardValue === 'on'}
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
                  <FormattedMarkdown text="container.pluginSpecificCacheTagCard.drawer.help" />
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
    cacheTagCardValue: getPluginSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getPluginSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    integrationName: state.config.config.integrationName,
    activeZonePlan: getZonePlanLegacyId(state.activeZone.name, state.zones)
  };
}
export default injectIntl(connect(mapStateToProps)(PluginSpecificCacheTagCard));
