import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Link from 'cf-component-link';

export default class AppNavigationLiNode extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {

        /*
         * Hard coding these styles until WWW creates a component for this.
         */
        //li className="icon-item"
        let liStyles = {
            fontSize: "1rem",
            textAlign: "center",
            width: "4.2rem",
            whiteSpace: "normal",
            display: "inline-block",
            verticalAlign: "top",
        };

        //span className="icon"
        let spanStyles = {
            backgroundColor: "#2f7bbf",
            borderColor: "transparent",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "4px solid transparent",
            color: "#FFF",
            display: "block",
            fontSize: "2.02666rem",
            height: "3.2rem",
            lineHeight: "2.8rem",
            margin: "0 auto 0.8rem auto",
            overflow: "hidden",
            width: "3.2rem",
        };

        //svg className="icon-svg"
        let svgStyles = {
            transition: "all 0.2s ease-in-out",
            boxSizing: "border-box",
            color: "#FFF",
            fontSize: "2.02666rem",
            lineHeight: "2.8rem",
        };

        let spanIconTitleStyles = {
            color: "#333",
            textAlign: "center",
            whiteSpace: "normal",
        };

        return (
            <li style={liStyles}>
                <Link onClick={this.props.onClick}>
                    <span style={spanStyles}>
                        <svg style={svgStyles} version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                            {this.props.children}
                        </svg>
                    </span>
                    <span style={spanIconTitleStyles}>
                        <FormattedMessage id={this.props.title} />
                    </span>
                </Link>
            </li>
        );
    }
}
