import {
  zoneSetActiveZone,
  asyncZoneSetActiveZone
} from '../../actions/activeZone';
import { ZONES_SET_ACTIVE_ZONE } from '../../constants/ActionTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

const mockStore = configureStore([thunk]);

describe('Active Zone Actions', () => {
  jest.mock('cf-util-http');

  describe('zoneSetActiveZone', () => {
    it('should match snapshot', () => {
      expect(zoneSetActiveZone({ id: 'id' })).toMatchSnapshot();
    });
  });

  describe('asyncZoneSetActiveZone', () => {
    it('should match snapshot for undefined zone.id', () => {
      let id = 'id';
      nock('https://api.cloudflare.com/client/v4')
        .filteringPath(function(path) {
          return '/';
        })
        .get('/')
        .reply(200, {});

      const store = mockStore();
      store.dispatch(asyncZoneSetActiveZone({}));
      expect(store.getActions()).toMatchSnapshot();
    });

    it('should match snapshot for valid zone.id', () => {
      const store = mockStore();
      store.dispatch(asyncZoneSetActiveZone({ id: 'id' }));
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
