import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Link from 'cf-component-link';

export default class AppNavigationLiNode extends Component {

    render() {
        return (
            <li className="icon-item" style={{'backgroundColor' : 'white'}}>
                <Link onClick={this.props.onClick}>
                    <span className="icon">
                        <svg className="icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                            {this.props.children}
                        </svg>
                    </span>
                    <span className="icon-title">
                        <FormattedMessage id={this.props.title} />
                    </span>
                </Link>
            </li>
        );
    }
}

AppNavigationLiNode.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};