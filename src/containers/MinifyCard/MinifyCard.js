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
import { CheckboxGroup } from 'cf-component-checkbox';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import {
  getZoneSettingsValueForZoneId,
  getZoneSettingsModifiedDateForZoneId
} from '../../selectors/zoneSettings';

const SETTING_NAME = 'minify';

class MinifyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxValues: [],
      activeDrawer: null
    };
    this.handleDrawerClick = this.handleDrawerClick.bind(this);
  }

  handleDrawerClick(id) {
    this.setState({
      activeDrawer: id === this.state.activeDrawer ? null : id
    });
  }

  componentWillMount() {
    let checkboxValues = [];
    //convert on/off to true/false
    for (var key in this.props.minifyValues) {
      if (this.props.minifyValues[key] === 'on') {
        checkboxValues.push(key);
      }
    }
    this.setState({ checkboxValues: checkboxValues });
  }

  handleCheckboxChange(checkboxValueList) {
    let apiValueList = {
      js: 'off',
      css: 'off',
      html: 'off'
    };

    // Convert items selected to 'on'
    checkboxValueList.forEach(function(item) {
      apiValueList[item] = 'on';
    });

    let { activeZoneId, dispatch } = this.props;

    this.setState({ checkboxValues: checkboxValueList });
    dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, apiValueList));
  }

  render() {
    const { formatMessage } = this.props.intl;
    let { modifiedDate } = this.props;

    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: 'container.minifyCard.title' })}
              footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}
            >
              <p>
                <FormattedMessage id="container.minifyCard.description" />
              </p>
            </CardContent>
            <CardControl>
              <CheckboxGroup
                values={this.state.checkboxValues}
                onChange={this.handleCheckboxChange.bind(this)}
                options={[
                  {
                    label: formatMessage({
                      id: 'container.minifyCard.javascript'
                    }),
                    name: 'minify_js',
                    value: 'js'
                  },
                  {
                    label: formatMessage({ id: 'container.minifyCard.css' }),
                    name: 'minify_css',
                    value: 'css'
                  },
                  {
                    label: formatMessage({ id: 'container.minifyCard.html' }),
                    name: 'minify_html',
                    value: 'html'
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
                  <FormattedMarkdown text="container.minifyCard.drawer.help" />
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
    minifyValues: getZoneSettingsValueForZoneId(
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
export default injectIntl(connect(mapStateToProps)(MinifyCard));
