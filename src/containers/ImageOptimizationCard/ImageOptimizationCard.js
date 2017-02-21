import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Card, CardSection, CardContent } from "cf-component-card";

import CustomCardControl
  from "../../components/CustomCardControl/CustomCardControl";
import { asyncZoneUpdateSetting } from "../../actions/zoneSettings";
import { PRO_PLAN } from "../../constants/Plans.js";
import { getLastModifiedDate } from "../../utils/utils";
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from "../../selectors/zoneSettings";

import Toggle from "cf-component-toggle";

const SETTING_NAME_MIRAGE = "mirage";
const SETTING_NAME_POLISH = "polish";
const SETTING_NAME = "image_optimization";
const MINIMUM_PLAN = PRO_PLAN;

class ImageOptimizationCard extends Component {
  handleChange(value) {
    let { activeZoneId, dispatch } = this.props;

    if (value === true) {
      dispatch(asyncZoneUpdateSetting(SETTING_NAME_MIRAGE, activeZoneId, "on"));
      dispatch(
        asyncZoneUpdateSetting(SETTING_NAME_POLISH, activeZoneId, "lossless")
      );
    } else {
      dispatch(
        asyncZoneUpdateSetting(SETTING_NAME_MIRAGE, activeZoneId, "off")
      );
      dispatch(
        asyncZoneUpdateSetting(SETTING_NAME_POLISH, activeZoneId, "off")
      );
    }
  }

  render() {
    let { activeZone, zones, modifiedDate } = this.props;
    let zone = zones[activeZone.name];

    let imageOptimizationValue = this.props.mirageValue === "on" &&
      (this.props.polishValue === "lossless" ||
        this.props.polishValue === "lossy");

    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: "container.imageOptimization.title" })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <FormattedMessage id="container.imageOptimization.description" />
            </CardContent>
            <CustomCardControl
              minimumPlan={MINIMUM_PLAN}
              currentPlan={zone.plan.legacy_id}
              indentifier={SETTING_NAME}
            >
              <Toggle
                label=""
                value={imageOptimizationValue}
                onChange={this.handleChange.bind(this)}
              />
            </CustomCardControl>
          </CardSection>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZoneId: state.activeZone.id,
    mirageValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME_MIRAGE,
      state
    ),
    polishValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME_POLISH,
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
export default injectIntl(connect(mapStateToProps)(ImageOptimizationCard));
