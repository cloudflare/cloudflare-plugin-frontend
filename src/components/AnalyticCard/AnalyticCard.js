import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Card, CardSection, CardContent } from "cf-component-card";
import Text from "cf-component-text";
import C3Wrapper from "../C3Wrapper/C3Wrapper";

import { humanFileSize } from "../../utils/utils";

class AnalyticCard extends Component {
  render() {
    let { title, description, data, dataType } = this.props;
    const { formatMessage } = this.props.intl;

    var firstData, secondData, firstText, secondText;
    var percentage = 100;
    if (dataType === "Bandwidth") {
      if (data.all !== 0) {
        percentage = data.cached / data.all * 100;
      }
      firstData = data.cached;
      secondData = data.all - data.cached;
      firstText = humanFileSize(data.cached) +
        " " +
        formatMessage({ id: "container.analyticCard.bandwidth.firstText" });
      secondText = humanFileSize(data.all) +
        " " +
        formatMessage({ id: "container.analyticCard.bandwidth.secondText" });
    } else if (dataType === "SSL") {
      if (data.unencrypted !== 0) {
        percentage = data.encrypted / (data.encrypted + data.unencrypted) * 100;
      }
      firstData = data.encrypted;
      secondData = data.unencrypted;
      firstText = data.encrypted +
        " " +
        formatMessage({ id: "container.analyticCard.ssl.firstText" });
      secondText = data.unencrypted +
        " " +
        formatMessage({ id: "container.analyticCard.ssl.secondText" });
    }

    let formatedTitle = percentage.toFixed(1) + "%";

    return (
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <Card>
          <CardSection>
            <CardContent title={title}>
              <Text size="small" type="muted">{description}</Text>
              <hr style={{ margin: "1rem 0" }} width="100%" />
              <div style={{ textAlign: "center" }}>
                <C3Wrapper
                  config={{
                    data: {
                      type: "donut",
                      columns: [
                        ["firstData", firstData],
                        ["secondData", secondData]
                      ],
                      colors: {
                        secondData: "#dddddd"
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

                <Text><b>{firstText}</b></Text>
                <Text>{secondText}</Text>
              </div>
            </CardContent>
          </CardSection>
        </Card>
      </div>
    );
  }
}

AnalyticCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  dataType: React.PropTypes.string.isRequired
};

function mapStateToProps() {
  return {};
}
export default injectIntl(connect(mapStateToProps)(AnalyticCard));
