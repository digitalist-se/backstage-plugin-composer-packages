/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { useAsync } from 'react-use';
import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import { MissingAnnotationEmptyState } from '@backstage/core-components';
import { MeiliSearch, SearchParams } from 'meilisearch';
import { COMPOSER_PACKAGES_ANNOTATION } from '../../annotationHelpers';
import type { Library } from '../Table';
import { DenseTable } from '../Table';
import { useURL, useToken, useIndex } from '../../hooks/GetConfig';

export const Show = () => {
  const { entity } = useEntity();

  const iscomposerPackagesAvailable = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.[COMPOSER_PACKAGES_ANNOTATION]);

  const projectId =
    entity?.metadata.annotations?.[COMPOSER_PACKAGES_ANNOTATION];

  const searchParams: SearchParams = {
    limit: 200000,
    filter: ['site =' + projectId + ''],
  };

  const url: any = useURL();
  const apikey: any = useToken();
  const searchindex: string = useIndex();

  const { value } = useAsync(async (): Promise<Library[]> => {
    const client = new MeiliSearch({
      host: url,
      apiKey: apikey,
    });
    const index = client.index(searchindex);
    const search = await index.search<Library>('*', searchParams);
    return search.hits;
  }, []);

  const isListAvailable = entity && iscomposerPackagesAvailable(entity);
  if (isListAvailable) return <DenseTable composerpackages={value || []} />;
  return (
    <MissingAnnotationEmptyState annotation={COMPOSER_PACKAGES_ANNOTATION} />
  );
};
