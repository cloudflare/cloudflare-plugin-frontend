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
import { RadioGroup } from 'cf-component-radio';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'cache_level';

class CacheLevelCard extends Component {
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

  handleRadioChange(value) {
    let { activeZoneId, dispatch } = this.props;
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
              title={formatMessage({ id: 'container.cacheLevelCard.title' })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage id="container.cacheLevelCard.description" />
              </p>
            </CardContent>
            <CardControl>
              <RadioGroup
                value={this.props.cacheLevelValue}
                onChange={this.handleRadioChange.bind(this)}
                options={[
                  {
                    label: formatMessage({
                      id: 'container.cacheLevelCard.simplified'
                    }),
                    name: 'cache_level_simplified',
                    value: 'simplified'
                  },
                  {
                    label: formatMessage({
                      id: 'container.cacheLevelCard.basic'
                    }),
                    name: 'cache_level_basic',
                    value: 'basic'
                  },
                  {
                    label: formatMessage({
                      id: 'container.cacheLevelCard.aggressive'
                    }),
                    name: 'cache_level_aggressive',
                    value: 'aggressive'
                  }
                ]}
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
                  <FormattedMarkdown text="container.cacheLevelCard.drawer.help" />
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
    cacheLevelValue: getZoneSettingsValueForZoneId(
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
export default injectIntl(connect(mapStateToProps)(CacheLevelCard));
