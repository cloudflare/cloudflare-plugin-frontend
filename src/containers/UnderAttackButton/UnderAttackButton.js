import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button } from 'cf-component-button';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getZoneSettingsValueForZoneId } from '../../selectors/zoneSettings';

const SETTING_NAME = 'security_level';

class UnderAttackButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.securityLevelValue
        };
    }

    handleChange(value) {
        let { dispatch } = this.props;
        this.setState({ value: value });
        dispatch(asyncZoneUpdateSetting(SETTING_NAME, this.props.activeZoneId, value));
    }

    render() {
        let { value } = this.state;
        let buttonText = (value === 'under_attack') ? 'container.underAttackButton.turnOn' : 'container.underAttackButton.turnOff';
        let buttonValue = (value === 'under_attack') ? 'essentially_off' : 'under_attack';
        let buttonType = (value === 'under_attack') ? 'warning' : 'primary';

        let underAttackStyles = {
            fontSize: "75%",
            textAlign: "right",
            position: "absolute",
            top: "50%",
            width: "73%",
            transform: "translateY(-50%)",
        };

        return (
            <div className="under-attack-button" style={ underAttackStyles }>
                <span style={{ marginRight: "0.5rem" }}>
                    <FormattedMessage id="container.underAttackButton.description"/>
                </span>

                <Button type={buttonType} onClick={ this.handleChange.bind(this, buttonValue) }>
                    <div style={{ fontSize: "75%" }}>
                        <FormattedMessage id={buttonText}/>
                    </div>
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        securityLevelValue: getZoneSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
    };
}
export default injectIntl(connect(mapStateToProps)(UnderAttackButton));
