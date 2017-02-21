export function generateUTMLink(pageURL, utmSource, utmCampaign, utmContent) {
  var utmLink = pageURL +
    "?utm_source=pi-" +
    utmSource +
    "&utm_medium=plugin&utm_campaign=" +
    utmCampaign;
  if (utmContent !== undefined) {
    utmLink += "&utm_content=" + utmContent;
  }

  return utmLink;
}
