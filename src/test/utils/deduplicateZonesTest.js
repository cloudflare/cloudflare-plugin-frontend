import { deduplicateOnActiveZones } from '../../utils/utils';
import expect from 'expect';

describe('deduplicateZones', () => {
  it('should not change a list of zones without any duplicate', () => {
    expect(
      deduplicateOnActiveZones([
        { id: '1', name: 'cloudflare.com', status: 'active' },
        { id: '2', name: 'blog.cloudflare.com', status: 'active' }
      ])
    ).toEqual([
      { id: '1', name: 'cloudflare.com', status: 'active' },
      { id: '2', name: 'blog.cloudflare.com', status: 'active' }
    ]);
  });

  it('should remove non-active zone in case of duplicates', () => {
    expect(
      deduplicateOnActiveZones([
        { id: '1', name: 'cloudflare.com', status: 'active' },
        { id: '2', name: 'blog.cloudflare.com', status: 'active' },
        { id: '3', name: 'cloudflare.com', status: 'purged' }
      ])
    ).toEqual([
      { id: '1', name: 'cloudflare.com', status: 'active' },
      { id: '2', name: 'blog.cloudflare.com', status: 'active' }
    ]);
  });

  it('should not remove duplicates when there is no active zone', () => {
    expect(
      deduplicateOnActiveZones([
        { id: '1', name: 'cloudflare.com', status: 'pending' },
        { id: '2', name: 'blog.cloudflare.com', status: 'active' },
        { id: '3', name: 'cloudflare.com', status: 'purged' }
      ])
    ).toEqual([
      { id: '1', name: 'cloudflare.com', status: 'pending' },
      { id: '2', name: 'blog.cloudflare.com', status: 'active' },
      { id: '3', name: 'cloudflare.com', status: 'purged' }
    ]);
  });

  it('should remove multiple duplicates when there is one active zone', () => {
    expect(
      deduplicateOnActiveZones([
        { id: '1', name: 'cloudflare.com', status: 'pending' },
        { id: '2', name: 'cloudflare.com', status: 'purged' },
        { id: '3', name: 'cloudflare.com', status: 'active' },
        { id: '4', name: 'cloudflare.com', status: 'moved' }
      ])
    ).toEqual([{ id: '3', name: 'cloudflare.com', status: 'active' }]);
  });
});
