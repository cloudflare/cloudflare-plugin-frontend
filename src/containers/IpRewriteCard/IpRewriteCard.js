import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Card, CardSection, CardContent, CardControl } from 'cf-component-card';
import Toggle from 'cf-component-toggle';

import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId, getPluginSettingsModifiedDateForZoneId } from '../../selectors/pluginSettings';
import { getLastModifiedDate } from '../../utils/utils';

const SETTING_NAME = 'ip_rewrite';

class IpRewriteCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? 'on' : 'off');
        dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() { 
        const { formatMessage } = this.props.intl;
        let { modifiedDate } = this.props;

        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({ id: 'container.ipRewrite.title' })} footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}>
                            <p><FormattedMessage id="container.ipRewrite.description" /></p>
                        </CardContent>
                        <CardControl>
                            <Toggle
                                label=""
                                value={(this.props.ipRewriteValue === 'on')}
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
        ipRewriteValue: getPluginSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
        modifiedDate: getPluginSettingsModifiedDateForZoneId(state.activeZone.id, SETTING_NAME, state),
    };
}
export default injectIntl(connect(mapStateToProps)(IpRewriteCard));
