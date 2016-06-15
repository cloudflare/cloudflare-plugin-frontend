import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { asyncPluginUpdateSetting } from '../../actions/ipRewrite';
import { Card, CardSection, CardContent, CardControl, CardDrawers } from 'cf-component-card';
import Toggle from 'cf-component-toggle';

const SETTING_NAME = "ip_rewrite";

class IpRewriteCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? "on" : "off");

        dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.ipRewrite.title'})}>
                            <p><FormattedMessage id="container.ipRewrite.description" /></p>
                        </CardContent>
                        <CardControl>
                            <Toggle
                                label=""
                                value={(this.props.ipRewriteValue === "on")}
                                onChange={this.handleChange.bind(this)}/>
                        </CardControl>
                    </CardSection>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        ipRewriteValue: state.pluginSettings.entities[state.activeZone.id][SETTING_NAME].value,
    }
}
export default injectIntl(connect(mapStateToProps)(IpRewriteCard));
