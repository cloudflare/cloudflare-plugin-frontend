import { generateChannelLink } from '../../selectors/generateChannelLink.js';

describe('generateChannelLink', function() {
  it('should return appended wordpress uri', function() {
    expect(
      generateChannelLink('htttp://www.example.com?Param1=param', 'wordpress')
    ).toBe(
      'htttp://www.example.com?Param1=param&channel=Integration:wordpress'
    );

    it('should return any arbitary channel', function() {
      expect(
        generateChannelLink('htttp://www.example.com', 'someNewChannel')
      ).toBe('htttp://www.example.com?channel=Integration:someNewChannel');
    });

    it('should return same url when no integrationName', function() {
      expect(generateChannelLink('htttp://www.example.com', '')).toBe(
        'htttp://www.example.com'
      );
    });

    it('should return same url when no integrationName', function() {
      expect(generateChannelLink('htttp://www.example.com')).toBe(
        'htttp://www.example.com'
      );
    });
  });
});
