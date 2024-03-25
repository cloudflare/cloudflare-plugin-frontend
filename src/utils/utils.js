function beginsWith(needle, haystack) {
  return haystack.substr(0, needle.length) == needle;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function isSubdomain(selectedZoneName) {
  var currentDomainName = new URL(document.URL).hostname;

  if (
    endsWith(currentDomainName, selectedZoneName) &&
    !beginsWith('www.', currentDomainName) &&
    selectedZoneName !== currentDomainName &&
    currentDomainName &&
    selectedZoneName
  ) {
    return true;
  }

  return false;
}

export function getLastModifiedDate(intl, modfiedDate) {
  const { formatMessage, formatRelative } = intl;

  if (!modfiedDate) {
    // Once you get the new code try this
    return null;
  }

  var formattedModefiedDate = formatRelative(new Date(modfiedDate), {
    now: Date.now()
  });

  var value = { date: formattedModefiedDate };
  return formatMessage({ id: 'utils.utils.lastmodifieddate' }, value);
}

export function humanFileSize(bytes) {
  var thresh = 1000;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
}

export function openWindow720x720(link) {
  window.open(link, '_blank', 'toolbar=0,status=0,width=720,height=700');
}

export function formatMessageForIntegration(
  intl,
  translationId,
  integrationName
) {
  const { formatMessage } = intl;

  let integrationKey = translationId + '.' + integrationName;
  const messageId = !!intl.messages[integrationKey]
    ? integrationKey
    : translationId;

  return formatMessage({ id: messageId });
}

// deduplicateOnActiveZones was introduced as a potential fix for CUSTESC-36595. The goal of this function is to
// deduplicate the list of zones returned by the Cloudflare API based on the status of the zone. This way, we hope to
// guarantee that when normalizing the list of zones, only the active zone would show up in case of duplicates. For
// instance, in the mentioned tickets, two zones were potentially returned: a purged as well as an active zone.
export function deduplicateOnActiveZones(zones) {
  let filteredZones = [];
  const isActive = z => z.status === 'active';
  const isSameZone = (z1, z2) => z1.name === z2.name;

  zones.forEach(zone => {
    if (isActive(zone)) {
      // If the zone is active, we first remove all existing duplicates and then insert the active zone.
      filteredZones = filteredZones.filter(fZone => !isSameZone(zone, fZone));
      filteredZones.push(zone);
    } else {
      // If the zone is not active, we only insert it if there is no existing active zone.
      const alreadyHasActiveZone = filteredZones.some(
        fZone => isSameZone(zone, fZone) && isActive(fZone)
      );
      if (!alreadyHasActiveZone) {
        filteredZones.push(zone);
      }
    }
  });

  return filteredZones;
}
