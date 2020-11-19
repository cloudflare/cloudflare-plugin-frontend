import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MarkdownIt from 'markdown-it';

import { formatMessageForIntegration } from '../../utils/utils';
import { getConfigValue } from '../../selectors/config.js';

// To support different translations for differents integrations add
// "mycomponent.myfeature.integrationName1"
// "mycomponent.myfeature.integrationName2"
// ...
// and the default translation "mycomponent.myfeature"
//
// Afterwards call
// <FormattedMarkdown text="mycomponent.myfeature" />
class FormattedMarkdown extends Component {
  render() {
    let { integrationName, formattedMessage } = this.props;

    if (!formattedMessage) {
      formattedMessage = formatMessageForIntegration(
        this.props.intl,
        this.props.text,
        integrationName
      );
    }

    var md = new MarkdownIt();

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: md.render(formattedMessage)
        }}
      />
    );
  }
}

FormattedMarkdown.propTypes = {
  text: PropTypes.string,
  formattedMessage: PropTypes.string,
  intl: PropTypes.object,
  integrationName: PropTypes.string
};

function mapStateToProps(state) {
  return {
    integrationName: getConfigValue(state.config, 'integrationName')
  };
}
export default injectIntl(connect(mapStateToProps)(FormattedMarkdown));
