/**
 * Returns a link depending on the channel
 * Depending on pageUrl, will either append to existing query params or create a new query
 * @param {string} pageURL - Page url.
 * @param {string} integrationName - Will append channel depending on integration name.
 */

export function generateChannelLink(pageURL, integrationName) {
  let channelName;
  switch (integrationName) {
    case 'Magento':
      channelName = 'Integration: Magento 2';
      break;
    case 'cpanel':
      channelName = 'Integration: CPanel';
      break;
    case 'wordpress':
      channelName = 'Integration: WordPress';
      break;
    default:
      channelName = '';
  }
  if (pageURL.indexOf('?') > -1) {
    return encodeURI(`${pageURL}&channel=${channelName}`);
  }
  return encodeURI(`${pageURL}?channel=${channelName}`);
}
