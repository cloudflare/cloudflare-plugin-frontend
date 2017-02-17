import { expect } from 'chai';
import { pluginResponseOk } from '../../utils/PluginAPI/PluginAPI';

describe('PluginAPI', () => {
    it('pluginResponseOk should return true for valid response', () => {
        expect(
            pluginResponseOk({
                body: {
                    success: true
                }
            })
        ).to.eql(true);
    });
});