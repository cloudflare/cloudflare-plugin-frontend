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
import { Button } from 'cf-component-button';

import {
  getPluginSettingsIsFetching,
  getPluginSettingsModifiedDateForZoneId
} from '../../selectors/pluginSettings';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import Loading from 'cf-component-loading';
import FormattedMarkdown
  from '../../components/FormattedMarkdown/FormattedMarkdown';
import { getLastModifiedDate } from '../../utils/utils';

const SETTING_NAME = 'default_settings';
const VALUE = true;

class ApplyDefaultSettingsCard extends Component {
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

  onButtonClick() {
    let { activeZoneId, dispatch } = this.props;
    dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, VALUE));
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
                id: 'container.applydefaultsettingscard.title'
              })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage
                  id="container.applydefaultsettingscard.description"
                />
              </p>
            </CardContent>
            <CardControl>
              {this.props.isFetching === SETTING_NAME
                ? <Loading />
                : <Button
                    type="primary"
                    onClick={this.onButtonClick.bind(this)}
                  >
                    <FormattedMessage
                      id="container.applydefaultsettingscard.button"
                    />
                  </Button>}
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
                  <FormattedMarkdown
                    text="container.applydefaultsettingscard.drawer.help"
                  />
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
    modifiedDate: getPluginSettingsModifiedDateForZoneId(
      state.activeZone.id,
      SETTING_NAME,
      state
    ),
    isFetching: getPluginSettingsIsFetching(state)
  };
}
export default injectIntl(connect(mapStateToProps)(ApplyDefaultSettingsCard));
