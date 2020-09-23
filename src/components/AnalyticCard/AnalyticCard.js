import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardDrawers } from 'cf-component-card';
import Text from 'cf-component-text';
import C3Wrapper from '../C3Wrapper/C3Wrapper';

import FormattedMarkdown from '../../components/FormattedMarkdown/FormattedMarkdown';
import { humanFileSize } from '../../utils/utils';

class AnalyticCard extends Component {
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
    let { title, description, data, dataType } = this.props;
    const { formatMessage } = this.props.intl;

    var firstData, secondData, firstText, secondText;
    var percentage = 100;
    if (dataType === 'Bandwidth') {
      if (data.all !== 0) {
        percentage = (data.cached / data.all) * 100;
      }
      firstData = data.cached;
      secondData = data.all - data.cached;
      firstText =
        humanFileSize(data.cached) +
        ' ' +
        formatMessage({ id: 'container.analyticCard.bandwidth.firstText' });
      secondText =
        humanFileSize(data.all) +
        ' ' +
        formatMessage({ id: 'container.analyticCard.bandwidth.secondText' });
    } else if (dataType === 'SSL') {
      if (data.unencrypted !== 0) {
        percentage =
          (data.encrypted / (data.encrypted + data.unencrypted)) * 100;
      }
      firstData = data.encrypted;
      secondData = data.unencrypted;
      firstText =
        data.encrypted +
        ' ' +
        formatMessage({ id: 'container.analyticCard.ssl.firstText' });
      secondText =
        data.unencrypted +
        ' ' +
        formatMessage({ id: 'container.analyticCard.ssl.secondText' });
    }

    let formatedTitle = percentage.toFixed(1) + '%';

    return (
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <Card>
          <CardSection>
            <CardContent title={title}>
              <Text size="small" type="muted">
                {description}
              </Text>
              <hr style={{ margin: '1rem 0' }} width="100%" />
              <div style={{ textAlign: 'center' }}>
                <C3Wrapper
                  config={{
                    data: {
                      type: 'donut',
                      columns: [
                        ['firstData', firstData],
                        ['secondData', secondData]
                      ],
                      colors: {
                        secondData: '#dddddd'
                      }
                    },
                    size: {
                      height: 150,
                      width: 150
                    },
                    donut: {
                      title: formatedTitle,
                      label: {
                        show: false
                      }
                    },
                    tooltip: {
                      show: false
                    },
                    legend: {
                      show: false
                    }
                  }}
                />

                <Text>
                  <b>{firstText}</b>
                </Text>
                <Text>{secondText}</Text>
              </div>
            </CardContent>
          </CardSection>
          {this.props.helpTextId ? (
            <CardDrawers
              onClick={this.handleDrawerClick}
              active={this.state.activeDrawer}
              drawers={[
                {
                  id: 'help',
                  name: formatMessage({ id: 'container.drawer.help' }),
                  content: <FormattedMarkdown text={this.props.helpTextId} />
                }
              ]}
            />
          ) : null}
        </Card>
      </div>
    );
  }
}

AnalyticCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
  helpTextId: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  formatMessage: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}
export default injectIntl(connect(mapStateToProps)(AnalyticCard));
