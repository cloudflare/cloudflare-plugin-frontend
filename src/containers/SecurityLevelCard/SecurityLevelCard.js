import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardControl } from 'cf-component-card';
import Select from 'cf-component-select';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'security_level';

class SecurityLevelCard extends Component {
  handleChange(option) {
    let { dispatch } = this.props;
    let { value } = option;
    dispatch(
      asyncZoneUpdateSetting(SETTING_NAME, this.props.activeZoneId, value)
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    let { modifiedDate } = this.props;

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: 'container.securityLevelCard.title' })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage
                  id="container.securityLevelCard.description"
                />
              </p>
            </CardContent>
            <CardControl>
              <Select
                label=""
                value={this.props.securityLevelValue}
                options={[
                  {
                    value: 'essentially_off',
                    label: formatMessage({
                      id: 'container.securityLevelCard.select.essentiallyOff'
                    })
                  },
                  {
                    value: 'low',
                    label: formatMessage({
                      id: 'container.securityLevelCard.select.low'
                    })
                  },
                  {
                    value: 'medium',
                    label: formatMessage({
                      id: 'container.securityLevelCard.select.medium'
                    })
                  },
                  {
                    value: 'high',
                    label: formatMessage({
                      id: 'container.securityLevelCard.select.high'
                    })
                  },
                  {
                    value: 'under_attack',
                    label: formatMessage({
                      id: 'container.securityLevelCard.select.underAttack'
                    })
                  }
                ]}
                onChange={this.handleChange.bind(this)}
              />
            </CardControl>
          </CardSection>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZoneId: state.activeZone.id,
    securityLevelValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getZoneSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    )
  };
}
export default injectIntl(connect(mapStateToProps)(SecurityLevelCard));
