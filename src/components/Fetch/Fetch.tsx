import React from 'react';
import { useAsync } from 'react-use';
import { MeiliSearch, SearchParams } from 'meilisearch';
import type { Library } from '../Table';
import { DenseTable } from '../Table';
import { getURL, getToken, getIndex } from '../../hooks/GetConfig';

export const Fetch = () => {
  const searchParams: SearchParams = {
    limit: 20000,
  };

  const url: string = getURL()
  const apikey: string = getToken()
  const searchindex: string = getIndex()

  const { value } = useAsync(async (): Promise<Library[]> => {
    const client = new MeiliSearch({
      host: url,
      apiKey: apikey,
    });

    const index = client.index(searchindex);
    const search = await index.search<Library>('*', searchParams);
    return search.hits;
  }, []);

  return <DenseTable composerpackages={value || []} />;
};
