import { getAbsoluteUrl, getConfigValue } from '../..//selectors/config';
import { ABSOLUTE_URL_BASE_KEY } from '../..//reducers/config.js';

describe('Config Selector', () => {
  it('getAbsoluteUrl should concatenate the absolute URL', () => {
    expect(
      getAbsoluteUrl(
        {
          config: {
            [ABSOLUTE_URL_BASE_KEY]: 'http://site.com/'
          }
        },
        'test.html'
      )
    ).toBe('http://site.com/test.html');
  });

  it('getAbsoluteUrl should return url if no absolute url base is present', () => {
    expect(
      getAbsoluteUrl(
        {
          config: {}
        },
        'test.html'
      )
    ).toBe('test.html');
  });

  it('getConfigValue should return value if key exists', () => {
    expect(
      getConfigValue(
        {
          config: {
            key: 'value'
          }
        },
        'key'
      )
    ).toBe('value');
  });

  it('isDNSPageEnabled should return true if key is true', () => {
    expect(
      getConfigValue(
        {
          config: {
            isDNSPageEnabled: true
          }
        },
        'isDNSPageEnabled'
      )
    ).toBeTruthy();
  });
});
