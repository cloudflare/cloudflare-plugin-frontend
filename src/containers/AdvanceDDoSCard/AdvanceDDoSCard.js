import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';

import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import CustomCardControl
  from '../../components/CustomCardControl/CustomCardControl';
import { BIZ_PLAN, planNeedsUpgrade } from '../../constants/Plans.js';

const SETTING_NAME = 'advanceddos';
const MINIMUM_PLAN = BIZ_PLAN;

class AdvanceDDoSCard extends Component {
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

  render() {
    let { activeZone, zones } = this.props;
    let zone = zones[activeZone.name];
    const { formatMessage } = this.props.intl;

    if (!planNeedsUpgrade(zone.plan.legacy_id, MINIMUM_PLAN)) {
      return null;
    }

    return (
      <Card>
        <CardSection>
          <CardContent
            title={formatMessage({ id: 'container.advanceddos.title' })}
          >
            <FormattedMessage id="container.advanceddos.description" />
          </CardContent>
          <CustomCardControl
            minimumPlan={MINIMUM_PLAN}
            currentPlan={zone.plan.legacy_id}
            indentifier={SETTING_NAME}
          >
            <FormattedMessage id="container.advanceddos.value" />
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
                <FormattedMarkdown text="container.advanceddos.drawer.help" />
              )
            }
          ]}
        />
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZone: state.activeZone,
    zones: state.zones.entities.zones
  };
}
export default injectIntl(connect(mapStateToProps)(AdvanceDDoSCard));
