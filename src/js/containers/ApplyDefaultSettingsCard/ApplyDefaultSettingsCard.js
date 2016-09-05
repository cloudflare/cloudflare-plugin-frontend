import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter, ModalActions } from 'cf-component-modal';
import { Card, CardSection, CardContent, CardControl, CardDrawers } from 'cf-component-card';
import { Button } from 'cf-component-button';
import _ from 'lodash';

import { getPluginSettingsValueForZoneId, getPluginSettingsIsFetching, getPluginSettingsModifiedDateForZoneId } from '../../selectors/pluginSettings';
import { asyncPluginUpdateSetting } from '../../actions/pluginSettings';
import Loading from 'cf-component-loading';
import { getLastModifiedDate } from '../../utils/utils';


const SETTING_NAME = "default_settings";
const VALUE = true;

class ApplyDefaultSettingsCard extends Component {
    state = {
        isModalOpen: false,
    };

    onButtonClick() {
        this.setState({ isModalOpen: false });

        let { activeZoneId, dispatch } = this.props;
        dispatch(asyncPluginUpdateSetting(SETTING_NAME, activeZoneId, VALUE));
    }

    handleModalOpen(self) {
        this.setState({ isModalOpen: true });
    }

    handleModalClose() {
        this.setState({ isModalOpen: false });
    }

    render() {
        const { formatMessage } = this.props.intl;
        let { modifiedDate } = this.props;

        return ( 
            <div>
                <Card>
                    <CardSection>
                        <CardContent title={formatMessage({id: 'container.applydefaultsettingscard.title'})} footerMessage={getLastModifiedDate(this.props.intl, modifiedDate)}>
                            <p><FormattedMessage id="container.applydefaultsettingscard.description" /></p>
                        </CardContent>
                        <CardControl>
                            { (this.props.isFetching === SETTING_NAME) ? <Loading/> 
                            : 
                            <Button type="primary" onClick={ this.handleModalOpen.bind(this) }>
                                <FormattedMessage id="container.applydefaultsettingscard.button" />
                            </Button> 
                            }
                            

                            <Modal
                                isOpen={this.state.isModalOpen}
                                onRequestClose={this.handleModalClose.bind(this)}>
                                <ModalHeader>
                                    <ModalTitle><FormattedMessage id="container.applydefaultsettingscard.modal.title"/></ModalTitle>
                                    <ModalClose onClick={this.handleModalClose.bind(this)}/>
                                </ModalHeader>
                                <ModalBody>
                                        <p><FormattedMessage id="container.applydefaultsettingscard.modal.description"/></p>
                                </ModalBody>
                                <ModalFooter>
                                    <ModalActions>
                                        <Button type="primary" onClick={ this.onButtonClick.bind(this) }>
                                            <FormattedMessage id="container.applydefaultsettingscard.modal.button"/>
                                        </Button>
                                        <Button onClick={this.handleModalClose.bind(this)}>
                                            <FormattedMessage id="container.applydefaultsettingscard.modal.buttonCancel"/>
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
        // defaultSettingsValue: getPluginSettingsValueForZoneId(state.activeZone.id, SETTING_NAME, state),
        modifiedDate: getPluginSettingsModifiedDateForZoneId(state.activeZone.id, SETTING_NAME, state),
        isFetching: getPluginSettingsIsFetching(state),
    }
}
export default injectIntl(connect(mapStateToProps)(ApplyDefaultSettingsCard));
