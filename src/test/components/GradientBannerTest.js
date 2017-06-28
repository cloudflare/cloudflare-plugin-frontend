import React from 'react';
import GradientBanner from '../../components/GradientBanner/GradientBanner';
import renderer from 'react-test-renderer';
import { StyleProvider } from 'cf-style-provider';

it('renders enabled correctly', () => {
  const component = renderer
    .create(
      <StyleProvider
        cssNode={null}
        fontNode={null}
        dev={false}
        selectorPrefix="cf-"
      >
        <GradientBanner
          imgSrc="imgSrc"
          title="title"
          description="description"
        />
      </StyleProvider>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
