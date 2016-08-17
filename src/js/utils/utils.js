// Source: http://stackoverflow.com/a/23945027/4335588
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

export function isSubdomain(selectedZoneName) {
    var currentDomainName = extractDomain(document.URL);

    if (currentDomainName.endsWith(selectedZoneName) &&
        selectedZoneName != currentDomainName &&
        currentDomainName && selectedZoneName) {
        return true; 
    }

    return false;
}