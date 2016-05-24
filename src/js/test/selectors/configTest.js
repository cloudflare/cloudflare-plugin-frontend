import { expect } from 'chai';
import { getAbsoluteUrl } from '../../selectors/config';
import { ABSOLUTE_URL_BASE_KEY } from '../../reducers/config.js';
import 'babel-polyfill'; //Object.Assign

describe('Config Selector', () => {
    it('should concatenate the absolute URL', () => {
        expect(
            getAbsoluteUrl({
                config : {
                    [ABSOLUTE_URL_BASE_KEY]: "http://site.com/"
                }
            }, "test.html")
        ).to.eql("http://site.com/test.html");
    })
    
    it('should return url if no absolute url base is present', () => {
        expect(
            getAbsoluteUrl({
                config : {}
            }, "test.html")
        ).to.eql("test.html");
    })
})