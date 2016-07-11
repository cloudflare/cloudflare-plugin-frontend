import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId } from '../../selectors/pluginSettings';
import { Card, CardSection, CardContent, CardControl, CardDrawers } from 'cf-component-card';
import { Button } from 'cf-component-button';

const SETTING_NAME = "default_settings";
const VALUE = true;

class ApplyDefaultSettingsCard extends Component {

    handleChange() {
        let { activeZoneId, dispatch } = this.props;
        dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, VALUE));
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.applydefaultsettingscard.title'})}>
                            <p><FormattedMessage id="container.applydefaultsettingscard.description" /></p>
                        </CardContent>
                        <CardControl>
                            <Button type="primary" onClick={ this.handleChange.bind(this) }>
                                <FormattedMessage id="container.applydefaultsettingscard.button" />
                            </Button> 
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
        DefaultSettingsValue: getPluginSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
    }
}
export default injectIntl(connect(mapStateToProps)(ApplyDefaultSettingsCard));
