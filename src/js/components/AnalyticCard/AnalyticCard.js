import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { CardControl, CardContent } from 'cf-component-card';
import C3Wrapper from 'react-c3-wrapper';

import { humanFileSize } from '../../utils/utils';

class AnalyticCard extends Component {
    render() {
        let { title, description, data, dataType } = this.props;

        var firstData, secondData, firstText, secondText;
        var percentage = 100;
        if (dataType === "Bandwidth") {
            if (data.all !== 0) {
                percentage = (data.cached / (data.all)) * 100;
            }
            firstData = data.cached;
            secondData = data.all - data.cached;
            firstText = humanFileSize(data.cached) + " saved";
            secondText = humanFileSize(data.all) + " total bandwidth";
        } else if (dataType === "SSL") {
            if (data.unencrypted !== 0) {
                percentage = (data.encrypted / (data.encrypted + data.unencrypted)) * 100;
            }
            firstData = data.encrypted;
            secondData = data.unencrypted;
            firstText = data.encrypted + " SSL secured request";
            secondText = data.unencrypted + " unsecured requests";
        }
        
        let formatedTitle = percentage.toFixed(1) + "%";

        return (
            <CardControl>
                <CardContent title={ title }>
                    <p>{ description }</p>
                </CardContent>
                <C3Wrapper config={{
                 data: {
                    type : 'donut',
                     columns: [
                        ['firstData', firstData],
                        ['secondData', secondData],
                    ],
                    colors: {
                        secondData: '#dddddd',
                    },
                  },
                  donut: {
                      title: formatedTitle,
                      label: {
                          show: false
                      },
                  },
                  tooltip: {
                      show: false
                  },
                  legend: {
                      show: false
                  }

                }}/>
                <b><p>{ firstText }</p></b>
                <p>{ secondText }</p>
            </CardControl>
        );
    }
}

AnalyticCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
    dataType: React.PropTypes.string.isRequired,
};

function mapStateToProps() {
    return {};
}
export default injectIntl(connect(mapStateToProps)(AnalyticCard));
