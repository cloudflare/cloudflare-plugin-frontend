import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button, ButtonGroup } from 'cf-component-button';
import { Dropdown, DropdownLink } from 'cf-component-dropdown';

import { Card, CardSection, CardContent, CardControl } from 'cf-component-card';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ModalActions
} from 'cf-component-modal';
import Textarea from 'cf-component-textarea';

import {
  asyncZonePurgeCacheEverything,
  asyncZonePurgeCacheIndividualFiles
} from '../../actions/zonePurgeCache';

class PurgeCacheCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isIndividual: false,
      dropdownOpen: false,
      textareaValue: ''
    };
  }

  handleTextareaChange(event) {
    this.setState({ textareaValue: event.target.value });
  }

  handlePurgeCache() {
    this.handleModalClose();
    let { activeZoneId, dispatch } = this.props;
    var zonePurge = this.state.isIndividual
      ? asyncZonePurgeCacheIndividualFiles(
          activeZoneId,
          this.state.textareaValue
        )
      : asyncZonePurgeCacheEverything(activeZoneId);
    dispatch(zonePurge);
  }

  handleModalOpen(individualSelected) {
    this.setState({
      isModalOpen: true,
      isIndividual: individualSelected
    });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  renderTextarea() {
    if (!this.state.isIndividual) {
      return;
    }

    return (
      <Textarea
        name="files"
        value={this.state.textareaValue}
        onChange={this.handleTextareaChange.bind(this)}
      />
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Card>
          <CardSection>
            <CardContent
              title={formatMessage({ id: 'container.purgeCacheCard.title' })}
            >
              <p>
                <FormattedMessage id="container.purgeCacheCard.description" />
              </p>
            </CardContent>
            <CardControl>

              <ButtonGroup>
                <Button
                  type="primary"
                  onClick={() => this.setState({ dropdownOpen: true })}
                >
                  <FormattedMessage id="container.purgeCacheCard.dropdown" />
                </Button>

                {this.state.dropdownOpen &&
                  <Dropdown
                    onClose={() => this.setState({ dropdownOpen: false })}
                  >
                    <DropdownLink
                      onClick={this.handleModalOpen.bind(this, false)}
                    >
                      <FormattedMessage id="container.purgeCacheCard.button" />
                    </DropdownLink>
                    <DropdownLink
                      onClick={this.handleModalOpen.bind(this, true)}
                    >
                      <FormattedMessage id="container.purgeCacheByURLCard.button" />
                    </DropdownLink>
                  </Dropdown>}
              </ButtonGroup>

              <Modal
                isOpen={this.state.isModalOpen}
                onRequestClose={this.handleModalClose.bind(this)}
              >
                <ModalHeader>
                  <ModalTitle>
                    <FormattedMessage
                      id={
                        'container.' +
                          (this.state.isIndividual
                            ? 'purgeCacheByURLCard'
                            : 'purgeCacheCard') +
                          '.modal.title'
                      }
                    />
                  </ModalTitle>
                  <ModalClose onClick={this.handleModalClose.bind(this)} />
                </ModalHeader>
                <ModalBody>
                  <p>
                    <FormattedMessage
                      id={
                        'container.' +
                          (this.state.isIndividual
                            ? 'purgeCacheByURLCard'
                            : 'purgeCacheCard') +
                          '.modal.description'
                      }
                    />
                  </p>
                  {this.renderTextarea()}
                </ModalBody>
                <ModalFooter>
                  <ModalActions>
                    <Button
                      type="primary"
                      onClick={this.handlePurgeCache.bind(this)}
                    >
                      <FormattedMessage
                        id={
                          'container.' +
                            (this.state.isIndividual
                              ? 'purgeCacheByURLCard'
                              : 'purgeCacheCard') +
                            '.button'
                        }
                      />
                    </Button>
                    <Button onClick={this.handleModalClose.bind(this)}>
                      <FormattedMessage
                        id={
                          'container.' +
                            (this.state.isIndividual
                              ? 'purgeCacheByURLCard'
                              : 'purgeCacheCard') +
                            '.modal.buttonCancel'
                        }
                      />
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
    activeZoneId: state.activeZone.id
  };
}
export default injectIntl(connect(mapStateToProps)(PurgeCacheCard));
