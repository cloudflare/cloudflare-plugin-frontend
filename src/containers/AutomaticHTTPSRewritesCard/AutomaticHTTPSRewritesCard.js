import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Toggle from 'cf-component-toggle';
import { Card, CardSection, CardContent, CardControl } from 'cf-component-card';

import { asyncZoneUpdateSetting } from '../../actions/zoneSettings';
import { getLastModifiedDate } from '../../utils/utils';
import { getZoneSettingsValueForZoneId, getZoneSettingsModifiedDateForZoneId } from '../../selectors/zoneSettings';

const SETTING_NAME = 'automatic_https_rewrites';

class AutomaticHTTPSRewritesCard extends Component {

    handleChange(value) {
        let { activeZoneId, dispatch } = this.props;
        value = (value === true ? 'on' : 'off');
        dispatch(asyncZoneUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() { 
        const { formatMessage } = this.props.intl;
        let { modifiedDate } = this.props;
        
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({ id: 'container.automatichttprewrites.title' })} footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}>
                            <p><FormattedMessage id="container.automatichttprewrites.description" /></p>
                        </CardContent>
                        <CardControl>
                            <Toggle
                                label=""
                                value={(this.props.rewriteValue === 'on')}
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
        rewriteValue: getZoneSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
        modifiedDate: getZoneSettingsModifiedDateForZoneId(state.activeZone.id, SETTING_NAME, state),
    };
}
export default injectIntl(connect(mapStateToProps)(AutomaticHTTPSRewritesCard));
