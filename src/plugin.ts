import {
  createPlugin,
  createRoutableExtension,
  createRouteRef,
} from '@backstage/core-plugin-api';


export const composerPackagesRootRef = createRouteRef({
  title: 'composer-packages',
});

export const composerPackagesPlugin = createPlugin({
  id: 'composerpackages',
  routes: {
    root: composerPackagesRootRef,
  },
});

export const ComposerPackagesPage = composerPackagesPlugin.provide(
  createRoutableExtension({
    component: () => import('./components/Overview').then(m => m.Overview),
    mountPoint: composerPackagesRootRef,
  }),
);

export const EntityComposerPackagesContent = composerPackagesPlugin.provide(
  createRoutableExtension({
    component: () => import('./components/Show').then(m => m.Show),
    mountPoint: composerPackagesRootRef,
  }),
);
