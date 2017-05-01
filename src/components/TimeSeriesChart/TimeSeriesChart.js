import React, { Component } from 'react';
import PropTypes from 'prop-types';
import C3Wrapper from '../C3Wrapper/C3Wrapper';

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
    for (let i = 0; i < xAxisValues.length; i++) {
      let label = xAxisValues[i].label;
      let values = xAxisValues[i].values;

      if (label && values) {
        columns.push([label].concat(values));
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
        <C3Wrapper config={config} />
      </div>
    );
  }
}

TimeSeriesChart.propTypes = {
  xAxisValues: PropTypes.array,
  yAxisLabel: PropTypes.string
};
