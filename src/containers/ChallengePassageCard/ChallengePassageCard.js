import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Select from 'cf-component-select';
import {
  Card,
  CardSection,
  CardContent,
  CardControl,
  CardDrawers
} from 'cf-component-card';

import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'challenge_ttl';

class ChallengePassageCard extends Component {
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

  handleChange(option) {
    let { activeZoneId, dispatch } = this.props;
    let { value } = option;
    dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, value));
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
                id: 'container.challengePassageCard.title'
              })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage id="container.challengePassageCard.description" />
              </p>
            </CardContent>
            <CardControl>
              <Select
                label=""
                value={this.props.challengePassageValue}
                options={[
                  {
                    value: 300,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.fiveMinutes'
                    })
                  },
                  {
                    value: 900,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.fifteenMinutes'
                    })
                  },
                  {
                    value: 1800,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.thirtyMinutes'
                    })
                  },
                  {
                    value: 2700,
                    label: formatMessage({
                      id:
                        'container.challengePassageCard.select.fortyFiveMinutes'
                    })
                  },
                  {
                    value: 3600,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.oneHour'
                    })
                  },
                  {
                    value: 7200,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.twoHours'
                    })
                  },
                  {
                    value: 10800,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.threeHours'
                    })
                  },
                  {
                    value: 14400,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.fourHours'
                    })
                  },
                  {
                    value: 28800,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.eightHours'
                    })
                  },
                  {
                    value: 57600,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.sixteenHours'
                    })
                  },
                  {
                    value: 86400,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.oneDay'
                    })
                  },
                  {
                    value: 604800,
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.oneWeek'
                    })
                  },
                  {
                    value: parseInt('2592000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.oneMonth'
                    })
                  },
                  {
                    value: parseInt('31536000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.challengePassageCard.select.oneYear'
                    })
                  }
                ]}
                onChange={this.handleChange.bind(this)}
              />
            </CardControl>
          </CardSection>
          <CardDrawers
            onClick={this.handleDrawerClick}
            active={this.state.activeDrawer}
            drawers={[
              {
                id: 'help',
                name: formatMessage({ id: 'container.drawer.help' }),
                content: (
                  <FormattedMarkdown text="container.challengePassageCard.drawer.help" />
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
    challengePassageValue: getZoneSettingsValueForZoneId(
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
export default injectIntl(connect(mapStateToProps)(ChallengePassageCard));
