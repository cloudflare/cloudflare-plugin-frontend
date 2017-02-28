import React, { Component, PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';

export default class MarketingFeature extends Component {
  render() {
    /*
         * These styles are stolen from the marketing site and aren't in our CSS
         */
    let divStyles = {
      padding: '30px 15px 30px 15px'
    };
    let iconStyles = {
      display: 'block',
      width: '40px',
      height: 'auto',
      maxWidth: '100px',
      margin: '0 auto'
    };
    let largeLinkStyles = {
      padding: '20px 0 0 0',
      textAlign: 'center',
      fontSize: '16px',
      color: '#2f7bbf',
      width: '100%',
      display: 'block'
    };
    let columnPStyles = {
      padding: '10px 0 0 0',
      fontSize: '12px',
      textAlign: 'center'
    };

    return (
      <div style={divStyles}>
        <img src={this.props.imgSrc} style={iconStyles} />
        <span style={largeLinkStyles} href="#">
          <FormattedMessage id={this.props.titleKey} />
        </span>
        <p style={columnPStyles}>
          <FormattedMessage id={this.props.descriptionKey} />
        </p>
      </div>
    );
  }
}

MarketingFeature.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired
};
