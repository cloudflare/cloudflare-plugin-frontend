import { generateChannelLink } from '../../selectors/generateChannelLink.js';

describe('generateChannelLink', function() {
  it('should return appended wordpress uri', function() {
    expect(
      generateChannelLink('htttp://www.example.com?Param1=param', 'wordpress')
    ).toBe(
      'htttp://www.example.com?Param1=param&channel=Integration:%20WordPress'
    );
  });
  it('should return new cpanel uri', function() {
    expect(generateChannelLink('htttp://www.example.com', 'cpanel')).toBe(
      'htttp://www.example.com?channel=Integration:%20CPanel'
    );
  });
});
