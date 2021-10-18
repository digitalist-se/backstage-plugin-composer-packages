import { useApi, configApiRef } from '@backstage/core-plugin-api';

export function useIndex() {
  const configApi = useApi(configApiRef);
  const index = configApi.getString('composerpackages.index')
  return index
}

export function useURL() {
  const configApi = useApi(configApiRef);
    const url = configApi.getString('composerpackages.url')
    return url
  }

export function useToken() {
  const configApi = useApi(configApiRef);
  const apikey = configApi.getString('composerpackages.apikey')
  return apikey
}
