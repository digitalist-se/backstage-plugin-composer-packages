import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { composerPackagesPlugin, ComposerPackagesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(composerPackagesPlugin)
  .addPage({
    element: <ComposerPackagesPage />,
    title: 'Root Page',
    path: '/composer-packages',
  })
  .render();
