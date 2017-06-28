import React from 'react';
import SplashPage from '../../containers/SplashPage/SplashPage';

import renderer from 'react-test-renderer';
import createMockStore from '../_helpers/createMockStore';

import { Provider } from 'react-redux';
import { StyleProvider } from 'cf-style-provider';
import { IntlProvider } from 'react-intl';

const messages = {
  'container.splashPage.heading.speedUp': 'Speed up and Optimize your WordPress Site with Cloudflare',
  'container.splashPage.help.alreadyHaveAccount': 'Have an account already? Sign in',
  'container.splashPage.help.here': 'here',
  'container.splashPage.button.createFreeAccount': 'Create Your Free Account',
  'component.benefitsFeature.globalCaching.title': 'Global Caching',
  'component.benefitsFeature.globalCaching.description': "Shorten your visitor's load times with content caching in our 110+ global locations.",
  'component.benefitsFeature.optimization.title': 'Website Optimization',
  'component.benefitsFeature.optimization.description': "Deliver content to users faster by enabling Cloudflare's content optimizations.",
  'component.benefitsFeature.security.title': 'Security',
  'component.benefitsFeature.security.description': 'Cloudflare offers protections against vulnerabilities including DDoS protection.',
  'component.benefitsFeature.insights.title': 'Insights',
  'component.benefitsFeature.insights.description': 'Monitor bandwidth saved, threats blocked, and more with built-in analytics.'
};

it('renders enabled correctly', () => {
  window.localStorage = {};
  const component = renderer
    .create(
      <Provider
        store={createMockStore({
          config: { config: { integrationName: 'wordpress' } }
        })}
      >
        <IntlProvider locale="en" messages={messages}>

          <StyleProvider
            cssNode={null}
            fontNode={null}
            dev={false}
            selectorPrefix="cf-"
          >
            <SplashPage />
          </StyleProvider>
        </IntlProvider>
      </Provider>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
