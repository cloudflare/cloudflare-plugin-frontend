import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import { getPluginSettingsValueForZoneId } from '../../selectors/pluginSettings';
import { Card, CardSection, CardContent, CardControl, CardDrawers } from 'cf-component-card';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter, ModalActions } from 'cf-component-modal';
import { Button } from 'cf-component-button';

const SETTING_NAME = "plugin_specific_cache";

class PluginSpecificCacheCard extends Component {
    state = {
        isModalOpen: false,
    };

    handleModalOpen() {
        this.setState({ isModalOpen: true });
    }

    handleModalClose() {
        this.setState({ isModalOpen: false });
    }

    handleChange(value) {
        this.setState({ isModalOpen: false });

        let { activeZoneId, dispatch } = this.props;
        dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, value));
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.pluginSpecificCacheCard.title'})}>
                            <p><FormattedMessage id="container.pluginSpecificCacheCard.description" /></p>
                        </CardContent>
                        <CardControl>

                            { (this.props.cacheCardValue === false) ? (
                                <Button type="primary" onClick={this.handleModalOpen.bind(this)}>
                                    <FormattedMessage id="container.pluginSpecificCacheCard.button.enable" />
                                </Button> 
                                ) :
                                <Button onClick={this.handleChange.bind(this, false)}>
                                    <FormattedMessage id="container.pluginSpecificCacheCard.button.disable" />
                                </Button> 
                            }

                            <Modal
                                isOpen={this.state.isModalOpen}
                                onRequestClose={this.handleModalClose.bind(this)}>
                                <ModalHeader>
                                    <ModalTitle><FormattedMessage id="container.pluginSpecificCacheCard.modal.title"/></ModalTitle>
                                    <ModalClose onClick={this.handleModalClose.bind(this)}/>
                                </ModalHeader>
                                <ModalBody>
                                        <p><FormattedMessage id="container.pluginSpecificCacheCard.modal.description"/></p>
                                </ModalBody>
                                <ModalFooter>
                                    <ModalActions>
                                        <Button type="primary" onClick={ this.handleChange.bind(this, true) }>
                                            <FormattedMessage id="container.pluginSpecificCacheCard.modal.button"/>
                                        </Button>
                                        <Button onClick={this.handleModalClose.bind(this)}>
                                            <FormattedMessage id="container.pluginSpecificCacheCard.modal.buttonCancel"/>
                                        </Button>
                                    </ModalActions>
                                </ModalFooter>
                            </Modal>
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
        cacheCardValue: getPluginSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
    }
}
export default injectIntl(connect(mapStateToProps)(PluginSpecificCacheCard));
