import React from 'react';
import BenefitsFeature from '../../components/BenefitsFeature/BenefitsFeature';
import renderer from 'react-test-renderer';

it('renders enabled correctly', () => {
  const component = renderer
    .create(
      <BenefitsFeature
        imgSrc="imgSrc"
        title="title"
        description="description"
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
