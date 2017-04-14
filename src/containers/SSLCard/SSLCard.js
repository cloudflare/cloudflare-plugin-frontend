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

import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'ssl';

class SSLCard extends Component {
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

    dispatch(asyncZoneUpdateSetting('ssl', this.props.activeZoneId, value));
  }

  render() {
    const { formatMessage } = this.props.intl;
    let { modifiedDate } = this.props;

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: 'container.sslCard.title' })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p><FormattedMessage id="container.sslCard.description" /></p>
            </CardContent>
            <CardControl>
              <Select
                label=""
                value={this.props.sslValue}
                options={[
                  {
                    value: 'off',
                    label: formatMessage({
                      id: 'container.sslCard.select.off'
                    })
                  },
                  {
                    value: 'flexible',
                    label: formatMessage({
                      id: 'container.sslCard.select.flexible'
                    })
                  },
                  {
                    value: 'full',
                    label: formatMessage({
                      id: 'container.sslCard.select.full'
                    })
                  },
                  {
                    value: 'strict',
                    label: formatMessage({
                      id: 'container.sslCard.select.full_strict'
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
                  <FormattedMarkdown text="container.sslCard.drawer.help" />
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
    sslValue: getZoneSettingsValueForZoneId(
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
export default injectIntl(connect(mapStateToProps)(SSLCard));
