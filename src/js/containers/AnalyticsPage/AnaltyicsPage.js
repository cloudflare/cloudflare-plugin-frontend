import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Tabs, TabsPanel } from 'cf-component-tabs';
import { LayoutContainer, LayoutRow, LayoutColumn } from 'cf-component-layout';
import { Heading } from 'cf-component-heading';

import C3Wrapper from 'react-c3-wrapper';
import _ from 'lodash';

import { humanFileSize } from '../../utils/utils';

const REQUESTS_TAB = 'requests';
const BANDWIDTH_TAB = 'bandwidth';
const UNIQUES_TAB = 'uniques';
const THREATS_TAB = 'threats';

class AnaltyicsPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
            activeTab: REQUESTS_TAB
        };
    }

    handleTabChange(id) {
        this.setState({ activeTab: id });
    }

    render() {

        const { formatMessage } = this.props.intl;

        let { activeZoneId, allZoneAnalytics } = this.props;
        let analytics = Object.assign({}, allZoneAnalytics[activeZoneId]);

        let isEmpty = _.isEmpty(analytics);

        let cached = formatMessage({ id: 'containers.analyticsPage.cached' });
        let unCached = formatMessage({ id: 'containers.analyticsPage.uncached' });
        let threats = formatMessage({ id: 'containers.analyticsPage.threats' });
        let uniques = formatMessage({ id: 'containers.analyticsPage.uniques' });

        if (!isEmpty) {
          // Get Top Country Threat 
          var threatsTopCountry = "N/A";
          var tempThreatsTopCountryValue = 0;
          _.forEach(analytics.totals.threats.country, function(value, key) {
            if (tempThreatsTopCountryValue < value) {
              tempThreatsTopCountryValue = value;
              threatsTopCountry = key;
            }
          });
          
          var threatsTopType = "N/A";
          var tempThreatsTopTypeValue = 0;
          _.forEach(analytics.totals.threats.country, function(value, key) {
            if (tempThreatsTopTypeValue < value) {
              tempThreatsTopTypeValue = value;
              threatsTopType = key;
            }
          });
        }
        
        //for some reason this only renders correctly if we put the xformat in data AND axis
        let xformat = '%m/%d';

        return (
            <div>
                {isEmpty && (
                    <FormattedMessage id="errors.noActiveZoneSelected"/>
                )}
                {!isEmpty && (
                    <div>
                    <Heading size={1}><FormattedMessage id="container.analyticsPage.title"/></Heading>
                    <Tabs
                        activeTab={this.state.activeTab}
                        tabs={[
                          { id: REQUESTS_TAB, label: formatMessage({ id: 'container.analyticsPage.tabs.requests' }) },
                          { id: BANDWIDTH_TAB, label: formatMessage({ id: 'container.analyticsPage.tabs.bandwidth' }) },
                          { id: UNIQUES_TAB, label: formatMessage({ id: 'container.analyticsPage.tabs.uniques' }) },
                          { id: THREATS_TAB, label: formatMessage({ id: 'container.analyticsPage.tabs.threats' }) }
                        ]}
                        onChange={this.handleTabChange.bind(this)}>

                        <TabsPanel id={ REQUESTS_TAB }>
                          <LayoutContainer>
                            <LayoutRow>
                              <LayoutColumn width={1}><h3>{formatMessage({ id: 'container.analyticsPage.tabs.requests.title' }) }</h3></LayoutColumn>
                            </LayoutRow>
                            <LayoutRow> 
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.requests.total' }) }</h5>
                                  { analytics.totals.requests.all }
                              </LayoutColumn>
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.requests.cached' }) }</h5>
                                  { analytics.totals.requests.cached }
                              </LayoutColumn>
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.requests.uncached' }) }</h5>
                                  { analytics.totals.requests.uncached }
                              </LayoutColumn>
                            </LayoutRow>
                            <LayoutRow>
                              <C3Wrapper config={{
                                data: {
                                  x: 'x',
                                  xFormat: xformat,
                                  columns: [
                                    ['x'].concat(analytics.timeSeries),
                                    [cached].concat(analytics.requests[0]),
                                    [unCached].concat(analytics.requests[1])
                                  ]
                                },
                                axis: {
                                  x: {
                                      type: 'timeseries',
                                      tick: {
                                          format: xformat
                                      }
                                  },
                                  y: {
                                      label: formatMessage({ id: 'container.analyticsPage.tabs.requests' }) 
                                  }
                                }
                              }}/>
                            </LayoutRow>
                          </LayoutContainer>                            
                        </TabsPanel>

                        <TabsPanel id={ BANDWIDTH_TAB }>
                          <LayoutContainer>
                            <LayoutRow>
                              <LayoutColumn width={1}><h3>{formatMessage({ id: 'container.analyticsPage.tabs.bandwidth.title' }) }</h3></LayoutColumn>
                            </LayoutRow>
                            <LayoutRow> 
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.bandwidth.total' }) }</h5>
                                  { humanFileSize(analytics.totals.bandwidth.all) }
                              </LayoutColumn>
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.bandwidth.cached' }) }</h5>
                                  { humanFileSize(analytics.totals.bandwidth.cached) }
                              </LayoutColumn>
                              <LayoutColumn width={1/3}>
                                  <h5>{formatMessage({ id: 'container.analyticsPage.tabs.bandwidth.uncached' }) }</h5>
                                  { humanFileSize(analytics.totals.bandwidth.uncached) }
                              </LayoutColumn>
                            </LayoutRow>
                            <LayoutRow>
                              <C3Wrapper config={{
                                data: {
                                  x: 'x',
                                  xFormat: xformat,
                                  columns: [
                                    ['x'].concat(analytics.timeSeries),
                                    [cached].concat(analytics.bandwidth[0]),
                                    [unCached].concat(analytics.bandwidth[1])
                                  ]
                                },
                                axis: {
                                  x: {
                                      type: 'timeseries',
                                      tick: {
                                          format: xformat
                                      }
                                  },
                                  y: {
                                      label: formatMessage({ id: 'container.analyticsPage.tabs.bandwidth' }) 
                                  }
                                }
                              }}/>
                            </LayoutRow>
                          </LayoutContainer>   
                        </TabsPanel>

                        <TabsPanel id={ UNIQUES_TAB }>
                          <LayoutContainer>
                              <LayoutRow>
                                <LayoutColumn width={1}><h3>{formatMessage({ id: 'container.analyticsPage.tabs.uniques.title' }) }</h3></LayoutColumn>
                              </LayoutRow>
                              <LayoutRow> 
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.uniques.total' }) }</h5>
                                    { analytics.totals.uniques.all }
                                </LayoutColumn>
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.uniques.maximum' }) }</h5>
                                    { _.max(analytics.uniques[0]) }
                                </LayoutColumn>
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.uniques.minimum' }) }</h5>
                                    { _.min(analytics.uniques[0]) }
                                </LayoutColumn>
                              </LayoutRow>
                              <LayoutRow>
                                <C3Wrapper config={{
                                  data: {
                                    x: 'x',
                                    xFormat: xformat,
                                    columns: [
                                      ['x'].concat(analytics.timeSeries),
                                      [uniques].concat(analytics.uniques[0])
                                    ]
                                  },
                                  axis: {
                                    x: {
                                        type: 'timeseries',
                                        tick: {
                                            format: xformat
                                        }
                                    },
                                    y: {
                                        label: formatMessage({ id: 'container.analyticsPage.tabs.uniques' }) 
                                    }
                                  }
                                }}/>
                              </LayoutRow>
                            </LayoutContainer>  
                        </TabsPanel>

                        <TabsPanel id={ THREATS_TAB }>
                          <LayoutContainer>
                              <LayoutRow>
                                <LayoutColumn width={1}><h3>{formatMessage({ id: 'container.analyticsPage.tabs.threats.title' }) }</h3></LayoutColumn>
                              </LayoutRow>
                              <LayoutRow> 
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.threats.total' }) }</h5>
                                    { analytics.totals.threats.total ? analytics.totals.threats.total : 0 }
                                </LayoutColumn>
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.threats.country' }) }</h5>
                                    { threatsTopCountry }
                                </LayoutColumn>
                                <LayoutColumn width={1/3}>
                                    <h5>{formatMessage({ id: 'container.analyticsPage.tabs.threats.type' }) }</h5>
                                    { threatsTopType }
                                </LayoutColumn> 
                              </LayoutRow>
                              <LayoutRow>
                                <C3Wrapper config={{
                                 data: {
                                    x: 'x',
                                    xFormat: xformat,
                                    columns: [
                                      ['x'].concat(analytics.timeSeries),
                                      [threats].concat(analytics.threats[0])
                                    ]
                                  },
                                  axis: {
                                    x: {
                                        type: 'timeseries',
                                        tick: {
                                            format: xformat
                                        }
                                    },
                                    y: {
                                        label: formatMessage({ id: 'container.analyticsPage.tabs.threats' }) 
                                    }
                                  }
                                }}/>
                              </LayoutRow>
                            </LayoutContainer> 
                        </TabsPanel>
                    </Tabs>
                    </div>
                )}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        allZoneAnalytics: state.zoneAnalytics.entities,
    };
}

export default injectIntl(connect(mapStateToProps)(AnaltyicsPage));