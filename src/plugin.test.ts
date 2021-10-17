import { composerPackagesPlugin } from './plugin';

describe('composer-packages', () => {
  it('should export plugin', () => {
    expect(composerPackagesPlugin).toBeDefined();
  });
});
