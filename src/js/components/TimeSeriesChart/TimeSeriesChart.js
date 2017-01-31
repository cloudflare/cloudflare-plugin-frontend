import React, { Component } from 'react';
import C3Wrapper from 'react-c3-wrapper';

export default class TimeSeriesChart extends Component {

  /**
   * let xAxisValues = [{
   *   'label': 'x',
   *   'values': [1,2,3,4,5]
   * },
   * {
   *   'label': 'cached',
   *   'values: [1,2,3,4,5]
   * }];
   */
  render() {
    let { xAxisValues, yAxisLabel } = this.props;

    let columns = [];

    //First row of columms is the x axis key
    //The first element in the remaining rows column has to be the label
    for(let i = 0; i < xAxisValues.length; i++) {
      if(xAxisValues[i].values) {
        columns.push([xAxisValues[i].label].concat(xAxisValues[i].values));
      }
    }

    //for some reason this only renders correctly if we put the xformat in data AND axis
    let xformat = '%m/%d';

    let config = {
      data: {
        x: 'x',
        xFormat: xformat,
        columns: columns
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: xformat
          }
        },
        y: {
          label: yAxisLabel
        }
      }
    };

    return (
      <div>
        <C3Wrapper config={config}/>
      </div>
    );
  }
}

TimeSeriesChart.propTypes = {
  xAxisValues: React.PropTypes.array,
  yAxisLabel: React.PropTypes.string
};

