import React, { Component } from 'react';
import c3 from 'c3';

export default class C3Wrapper extends Component {
  updateC3(props) {
    props.config.bindto = this._container;
    if (this._chart) {
      this._chart.destroy();
    }
    this._chart = c3.generate(props.config);
  }

  componentDidMount() {
    this.updateC3(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateC3(props);
  }

  componentWillUnmount() {
    this._chart.destroy();
  }

  render() {
    return <div ref={chart => this._container = chart} />;
  }
}

C3Wrapper.propTypes = {
  config: React.PropTypes.object.isRequired
};
