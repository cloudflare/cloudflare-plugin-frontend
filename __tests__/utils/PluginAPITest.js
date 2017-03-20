import { pluginResponseOk } from '../../src/utils/PluginAPI/PluginAPI';

describe('PluginAPI', () => {
  it('pluginResponseOk should return true for valid response', () => {
    expect(
      pluginResponseOk({
        body: {
          success: true
        }
      })
    ).toEqual(true);
  });
});
