import React from 'react';
import FeatureManager from '../../components/FeatureManager/FeatureManager';
import renderer from 'react-test-renderer';

it('renders enabled correctly', () => {
  const component = renderer
    .create(
      <FeatureManager isEnabled={true} error="error">children</FeatureManager>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('renders disabled correctly', () => {
  const component = renderer
    .create(
      <FeatureManager isEnabled={false} error="error">children</FeatureManager>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
