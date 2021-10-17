import { Entity } from '@backstage/catalog-model';

export const COMPOSER_PACKAGES_ANNOTATION = 'packagist.org/composer-packages-site';

export const iscomposerPackagesAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[COMPOSER_PACKAGES_ANNOTATION]);

export const getcomposerPackagesSite = (entity: Entity) => {
  return entity?.metadata.annotations?.[COMPOSER_PACKAGES_ANNOTATION] ?? '';
};
