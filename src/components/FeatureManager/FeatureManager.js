import React, { Component } from 'react';

export default class FeatureManager extends Component {

    render() {
        return (
            <div>
                {this.props.isEnabled && (
                    this.props.children
                )}
                {!this.props.isEnabled && this.props.error && (
                    this.props.error
                )}
            </div>
        );
    }
}

FeatureManager.propTypes = {
    isEnabled: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string
};

