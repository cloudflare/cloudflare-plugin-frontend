// Source: http://stackoverflow.com/a/23945027/4335588
function extractDomain(url) {
    var domain;
    // find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    // find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

function beginsWith(needle, haystack){
    return (haystack.substr(0, needle.length) == needle);
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export function isSubdomain(selectedZoneName) {
    var currentDomainName = extractDomain(document.URL);

    if (endsWith(currentDomainName, selectedZoneName) &&
        !beginsWith("www.", currentDomainName) &&
        selectedZoneName !== currentDomainName &&
        currentDomainName && selectedZoneName) {
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

    var formattedModefiedDate = formatRelative(new Date(modfiedDate), { now: Date.now() });

    var value = { date: formattedModefiedDate };
    return formatMessage({ id: 'utils.utils.lastmodifieddate' }, value);
}

export function humanFileSize(bytes) {
    var thresh = 1000;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB','MB','GB','TB','PB','EB','ZB','YB']
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}

export function openWindow720x720(link) {
    window.open(link, '_blank', 'toolbar=0,status=0,width=720,height=700');
}