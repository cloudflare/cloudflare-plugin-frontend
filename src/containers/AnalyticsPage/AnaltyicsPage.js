import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Tabs, TabsPanel } from 'cf-component-tabs';
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';
import { Heading } from 'cf-component-heading';
import { format } from 'd3-format';

import _ from 'lodash';

import { humanFileSize } from '../../utils/utils';
import AnalyticCard from '../../components/AnalyticCard/AnalyticCard';
import WaitForSettings from '../../containers/WaitForSettings/WaitForSettings';
import { getZoneAnalyticsForZoneId } from '../../selectors/zoneAnalytics';
import TimeSeriesChart from '../../components/TimeSeriesChart/TimeSeriesChart';

const REQUESTS_TAB = 'requests';
const BANDWIDTH_TAB = 'bandwidth';
const UNIQUES_TAB = 'uniques';
const THREATS_TAB = 'threats';

class AnaltyicsPage extends Component {
  constructor(props) {
    super(props);

    var bytesToString = function(bytes) {
      var fmt = format('.0f');

      var splited = humanFileSize(bytes).split(' ');
      var unit = splited[1];
      var size = splited[0];

      return fmt(size) + unit;
    };

    this.state = {
      activeTab: REQUESTS_TAB,
      bytesToString: bytesToString
    };
  }

  handleTabChange(id) {
    this.setState({ activeTab: id });
  }

  getRequestsColumns(analytics) {
    let columns = [];
    if (analytics && analytics.timeSeries && analytics.requests) {
      columns = [
        {
          label: 'x',
          values: analytics.timeSeries
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.uncached'
          }),
          values: analytics.requests[1]
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.cached'
          }),
          values: analytics.requests[0]
        }
      ];
    }
    return columns;
  }

  getBandwidthColumns(analytics) {
    let columns = [];
    if (analytics && analytics.timeSeries && analytics.bandwidth) {
      columns = [
        {
          label: 'x',
          values: analytics.timeSeries
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.uncached'
          }),
          values: analytics.bandwidth[1]
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.cached'
          }),
          values: analytics.bandwidth[0]
        }
      ];
    }
    return columns;
  }

  getUniquesColumns(analytics) {
    let columns = [];
    if (analytics && analytics.timeSeries && analytics.uniques) {
      columns = [
        {
          label: 'x',
          values: analytics.timeSeries
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.uniques'
          }),
          values: analytics.uniques[0]
        }
      ];
    }
    return columns;
  }

  getThreatsColumns(analytics) {
    let columns = [];
    if (analytics && analytics.timeSeries && analytics.threats) {
      columns = [
        {
          label: 'x',
          values: analytics.timeSeries
        },
        {
          label: this.props.intl.formatMessage({
            id: 'containers.analyticsPage.threats'
          }),
          values: analytics.threats[0]
        }
      ];
    }
    return columns;
  }

  getTopThreatCountry(analytics) {
    let threatsTopCountry = 'N/A';
    let tempThreatsTopCountryValue = 0;
    if (analytics && analytics.totals && analytics.totals.threats) {
      _.forEach(analytics.totals.threats.country, function(value, key) {
        if (tempThreatsTopCountryValue < value) {
          tempThreatsTopCountryValue = value;
          threatsTopCountry = key;
        }
      });
    }
    return threatsTopCountry;
  }

  getTopThreatType(analytics) {
    let threatsTopType = 'N/A';
    let tempThreatsTopTypeValue = 0;
    if (analytics && analytics.totals && analytics.totals.threats) {
      _.forEach(analytics.totals.threats.country, function(value, key) {
        if (tempThreatsTopTypeValue < value) {
          tempThreatsTopTypeValue = value;
          threatsTopType = key;
        }
      });
    }
    return threatsTopType;
  }

  render() {
    const { formatMessage } = this.props.intl;

    let { activeZone, allZoneAnalytics } = this.props;
    let analytics = Object.assign(
      {},
      getZoneAnalyticsForZoneId(activeZone.id, allZoneAnalytics)
    );

    let threatsTopCountry = this.getTopThreatCountry(analytics);
    let threatsTopType = this.getTopThreatType(analytics);

    return (
      <WaitForSettings analytics>
        <div>
          <Heading size={1}>
            <FormattedMessage id="container.analyticsPage.title" />
          </Heading>
          <Tabs
            active={this.state.activeTab}
            tabs={[
              {
                id: REQUESTS_TAB,
                label: formatMessage({
                  id: 'container.analyticsPage.tabs.requests'
                })
              },
              {
                id: BANDWIDTH_TAB,
                label: formatMessage({
                  id: 'container.analyticsPage.tabs.bandwidth'
                })
              },
              {
                id: UNIQUES_TAB,
                label: formatMessage({
                  id: 'container.analyticsPage.tabs.uniques'
                })
              },
              {
                id: THREATS_TAB,
                label: formatMessage({
                  id: 'container.analyticsPage.tabs.threats'
                })
              }
            ]}
            onChange={this.handleTabChange.bind(this)}
          >
            <TabsPanel id={REQUESTS_TAB}>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1}>
                    <h3>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.requests.title'
                      })}
                    </h3>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.requests.total'
                      })}
                    </h5>
                    {analytics.totals ? analytics.totals.requests.all : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.requests.cached'
                      })}
                    </h5>
                    {analytics.totals ? analytics.totals.requests.cached : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.requests.uncached'
                      })}
                    </h5>
                    {analytics.totals ? analytics.totals.requests.uncached : ''}
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <TimeSeriesChart
                    xAxisValues={this.getRequestsColumns(analytics)}
                    yAxisLabel={formatMessage({
                      id: 'container.analyticsPage.tabs.requests'
                    })}
                  />
                </LayoutRow>
              </LayoutContainer>
            </TabsPanel>

            <TabsPanel id={BANDWIDTH_TAB}>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1}>
                    <h3>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.bandwidth.title'
                      })}
                    </h3>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.bandwidth.total'
                      })}
                    </h5>
                    {analytics.totals
                      ? humanFileSize(analytics.totals.bandwidth.all)
                      : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.bandwidth.cached'
                      })}
                    </h5>
                    {analytics.totals
                      ? humanFileSize(analytics.totals.bandwidth.cached)
                      : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.bandwidth.uncached'
                      })}
                    </h5>
                    {analytics.totals
                      ? humanFileSize(analytics.totals.bandwidth.uncached)
                      : ''}
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <TimeSeriesChart
                    xAxisValues={this.getBandwidthColumns(analytics)}
                    yAxisLabel={formatMessage({
                      id: 'container.analyticsPage.tabs.bandwidth'
                    })}
                  />
                </LayoutRow>
              </LayoutContainer>
            </TabsPanel>

            <TabsPanel id={UNIQUES_TAB}>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1}>
                    <h3>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.uniques.title'
                      })}
                    </h3>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.uniques.total'
                      })}
                    </h5>
                    {analytics.totals ? analytics.totals.uniques.all : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.uniques.maximum'
                      })}
                    </h5>
                    {analytics.uniques ? _.max(analytics.uniques[0]) : ''}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.uniques.minimum'
                      })}
                    </h5>
                    {analytics.uniques ? _.min(analytics.uniques[0]) : ''}
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <TimeSeriesChart
                    xAxisValues={this.getUniquesColumns(analytics)}
                    yAxisLabel={formatMessage({
                      id: 'container.analyticsPage.tabs.uniques'
                    })}
                  />
                </LayoutRow>
              </LayoutContainer>
            </TabsPanel>

            <TabsPanel id={THREATS_TAB}>
              <LayoutContainer>
                <LayoutRow>
                  <LayoutColumn width={1}>
                    <h3>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.threats.title'
                      })}
                    </h3>
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.threats.total'
                      })}
                    </h5>
                    {analytics.totals ? analytics.totals.threats.total : 0}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.threats.country'
                      })}
                    </h5>
                    {threatsTopCountry}
                  </LayoutColumn>
                  <LayoutColumn width={1 / 3}>
                    <h5>
                      {formatMessage({
                        id: 'container.analyticsPage.tabs.threats.type'
                      })}
                    </h5>
                    {threatsTopType}
                  </LayoutColumn>
                </LayoutRow>
                <LayoutRow>
                  <TimeSeriesChart
                    xAxisValues={this.getThreatsColumns(analytics)}
                    yAxisLabels={formatMessage({
                      id: 'container.analyticsPage.tabs.threats'
                    })}
                  />
                </LayoutRow>
              </LayoutContainer>
            </TabsPanel>
          </Tabs>

          <LayoutRow>
            <LayoutColumn width={74 / 150}>
              <AnalyticCard
                title={formatMessage({
                  id: 'container.analyticCard.ssl.title'
                })}
                description={formatMessage({
                  id: 'container.analyticCard.duration'
                })}
                data={analytics.totals ? analytics.totals.requests.ssl : 0}
                dataType={formatMessage({
                  id: 'container.analyticCard.ssl.datatype'
                })}
                helpTextId="container.analyticCard.ssl.drawer.help"
              />
            </LayoutColumn>
            <LayoutColumn width={2 / 150}>&nbsp;</LayoutColumn>
            <LayoutColumn width={74 / 150}>
              <AnalyticCard
                title={formatMessage({
                  id: 'container.analyticCard.bandwidth.title'
                })}
                description={formatMessage({
                  id: 'container.analyticCard.duration'
                })}
                data={analytics.totals ? analytics.totals.bandwidth : 0}
                dataType={formatMessage({
                  id: 'container.analyticCard.bandwidth.datatype'
                })}
                helpTextId="container.analyticCard.bandwidth.drawer.help"
              />
            </LayoutColumn>
          </LayoutRow>
        </div>
      </WaitForSettings>
    );
  }
}
function mapStateToProps(state) {
  return {
    activeZone: state.activeZone,
    allZoneAnalytics: state.zoneAnalytics
  };
}

export default injectIntl(connect(mapStateToProps)(AnaltyicsPage));
