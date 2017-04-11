import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import marked from 'marked';

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
    const { formatMessage } = this.props.intl;
    let { integrationName } = this.props;

    // This will try to do the following in order:
    //
    // 1) formatMessage({ id: mycomponent.myfeature.integrationName })
    // 2) formatMessage({ id: mycomponent.myfeature })
    // 3) "mycomponent.myfeature"
    // 
    // NOTE: This will log errors in dev but not in production
    var formattedMessage = formatMessage({
      id: this.props.text + '.' + integrationName,
      defaultMessage: formatMessage({ id: this.props.text })
    });

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: marked(formattedMessage)
        }}
      />
    );
  }
}

FormattedMarkdown.propTypes = {
  text: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    integrationName: getConfigValue(state.config, 'integrationName')
  };
}
export default injectIntl(connect(mapStateToProps)(FormattedMarkdown));
