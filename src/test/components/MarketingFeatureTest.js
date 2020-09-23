import React from 'react';
import MarketingFeature from '../../components/MarketingFeature/MarketingFeature';
import renderer from 'react-test-renderer';

it('renders enabled correctly', () => {
  const component = renderer
    .create(
      <MarketingFeature
        imgSrc="imgSrc"
        title="title"
        description="description"
      />
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
