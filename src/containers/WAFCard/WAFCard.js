import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import Toggle from 'cf-component-toggle';

import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import { getLastModifiedDate } from '../../utils/utils';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';
import CustomCardControl from '../../components/CustomCardControl/CustomCardControl';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { PRO_PLAN } from '../../constants/Plans.js';

const SETTING_NAME = 'waf';
const MINIMUM_PLAN = PRO_PLAN;

class WAFCard extends Component {
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
    dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, value));
  }

  render() {
    let { activeZone, zones, modifiedDate } = this.props;
    let zone = zones[activeZone.name];

    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: 'container.waf.title' })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <FormattedMessage id="container.waf.description" />
            </CardContent>
            <CustomCardControl
              minimumPlan={MINIMUM_PLAN}
              currentPlan={zone.plan.legacy_id}
              indentifier={SETTING_NAME}
            >
              <Toggle
                label=""
                value={this.props.WAFValue == 'on'}
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
                content: <FormattedMarkdown text="container.waf.drawer.help" />
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
    WAFValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getZoneSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    activeZone: state.activeZone,
    zones: state.zones.entities.zones
  };
}
export default injectIntl(connect(mapStateToProps)(WAFCard));
