import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Card,
  CardSection,
  CardContent,
  CardControl,
  CardDrawers
} from 'cf-component-card';
import Select from 'cf-component-select';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'browser_cache_ttl';

class BrowserCacheTTLCard extends Component {
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
              title={formatMessage({
                id: 'container.browserCacheTTLCard.title'
              })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage id="container.browserCacheTTLCard.description" />
              </p>
            </CardContent>
            <CardControl>
              <Select
                label=""
                value={this.props.browserCacheTTLValue}
                options={[
                  {
                    value: 7200,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twoHours'
                    })
                  },
                  {
                    value: 10800,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.threeHours'
                    })
                  },
                  {
                    value: 14400,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.fourHours'
                    })
                  },
                  {
                    value: parseInt('18000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.fiveHours'
                    })
                  },
                  {
                    value: 28800,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.eightHours'
                    })
                  },
                  {
                    value: 43200,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twelveHours'
                    })
                  },
                  {
                    value: 57600,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.sixteenHours'
                    })
                  },
                  {
                    value: parseInt('72000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twentyHours'
                    })
                  },
                  {
                    value: 86400,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.oneDay'
                    })
                  },
                  {
                    value: 172800,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twoDays'
                    })
                  },
                  {
                    value: 259200,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.threeDays'
                    })
                  },
                  {
                    value: 345600,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.fourDays'
                    })
                  },
                  {
                    value: parseInt('432000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.fiveDays'
                    })
                  },
                  {
                    value: 691200,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.eightDays'
                    })
                  },
                  {
                    value: 1382400,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.sixteenDays'
                    })
                  },
                  {
                    value: 2073600,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twentyFourDays'
                    })
                  },
                  {
                    value: 2678400,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.oneMonth'
                    })
                  },
                  {
                    value: 5356800,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.twoMonths'
                    })
                  },
                  {
                    value: 16070400,
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.sixMonths'
                    })
                  },
                  {
                    value: parseInt('31536000', 10), // This is a hack to avoid webpack converting to scientific notation
                    label: formatMessage({
                      id: 'container.browserCacheTTLCard.oneYear'
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
                  <FormattedMarkdown text="container.browserCacheTTLCard.drawer.help" />
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
    browserCacheTTLValue: getZoneSettingsValueForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    modifiedDate: getZoneSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    isFetching: state.zoneSettings.isFetching
  };
}
export default injectIntl(connect(mapStateToProps)(BrowserCacheTTLCard));
