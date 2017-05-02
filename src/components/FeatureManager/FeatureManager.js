import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FeatureManager extends Component {
  render() {
    return (
      <div>
        {this.props.isEnabled && this.props.children}
        {!this.props.isEnabled && this.props.error && this.props.error}
      </div>
    );
  }
}

FeatureManager.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  error: PropTypes.string
};
