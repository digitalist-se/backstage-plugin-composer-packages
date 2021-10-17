import { useApi, configApiRef } from '@backstage/core-plugin-api';

export function getIndex() {
  const configApi = useApi(configApiRef);
  const index = configApi.getString('composerpackages.index')
  return index
}

export function getURL() {
  const configApi = useApi(configApiRef);
    const url = configApi.getString('composerpackages.url')
    return url
  }

export function getToken() {
  const configApi = useApi(configApiRef);
  const apikey = configApi.getString('composerpackages.apikey')
  return apikey
}
