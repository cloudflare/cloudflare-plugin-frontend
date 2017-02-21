import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  NotificationGlobalContainer,
  NotificationList,
  Notification
} from "cf-component-notifications";
import * as NotificationActionCreators from "../../actions/notifications";

class GlobalNotifications extends Component {
  handleClose(id) {
    let { dispatch } = this.props;
    dispatch(NotificationActionCreators.notificationRemove(id));
  }

  render() {
    let { notifications } = this.props;
    const { formatMessage } = this.props.intl;

    const newNotifications = notifications.map(n => {
      return (
        <Notification
          key={n.key}
          type={n.level}
          message={n.localized ? formatMessage({ id: n.message }) : n.message}
          delay={n.delay}
          persist={n.persistant}
          onClose={this.handleClose.bind(this, n.key)}
        />
      );
    });

    return (
      <NotificationGlobalContainer>
        <NotificationList>
          {newNotifications}
        </NotificationList>
      </NotificationGlobalContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
}

export default injectIntl(connect(mapStateToProps)(GlobalNotifications));
