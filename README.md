# Composer packages

This plugins purpouse is to show packages, modules,
libraries etc. from a composer.lock file.

It's dependent on a external index of packages, modules,
libraries etc. in [Mielesearch](https://www.meilisearch.com/).

See example in the end how you could create an index in Mielesearch,
and use jq and uuidgen for extracting information from a composer.lock
file.

## Config

```yaml

composerpackages:
  index: 'modules'
  url: 'https://meilisearch.url'
  apikey: '2FXWwAope4nJroSD'
```
This configuration is a must.


## Getting started

All composer packages in you projects are avaible from route: `composer-packages`.

To add which packages are in your project you need to use annotation:
`'packagist.org/composer-packages-site'`. Where the identfier is the project
you added to the index, `example-com`, `example.com` or whatever standard you
want to use.

To show the it, as an example, add to `packages/app/src/components/catalog/EntityPage.tsx`:

```typescript
import {
  EntityComposerPackagesContent,
  iscomposerPackagesAvailable
} from '@digitalist-net-services/plugin-composer-packages'
```

```typescript
const serviceEntityPage = (
<EntityLayout>
  ...
    <EntityLayout.Route if={iscomposerPackagesAvailable} path="/composer-packages" title="Composer Packages">
        <EntityComposerPackagesContent />
    </EntityLayout.Route>
    ...
</EntityLayout>
```

## Mielesearch

## Example of creation of the index

First you need an instance of Mielesearch up (doh!), and then create the index.

```bash
curl \
  -X DELETE "${MEILIURL}/indexes/modules" \
  --header "X-Meili-API-Key: ${MEILIAPIKEY}"
```

The index is here named modules (in `app-confi.yaml` this equals settings for `index`)

## Example usage

### Gitlab runner.

```yaml

stages:
- collect
- upload

module_collection:
  stage: collect
  rules:
  - if: $NIGHTLY == "true"
    when: never
  - if: $CI_COMMIT_BRANCH == "module_scan"
    when: always
  image:
    name: ozziio/jq:0.1 #or any image with jq and uuidgen
    entrypoint:
    - ''
  script:
  - .ci/modules_report.sh > modules.json
  artifacts:
    expire_in: 120 min
    paths:
    - "modules.json"
module_upload:
  stage: upload
  rules:
  - if: $NIGHTLY == "true"
    when: never
  - if: $CI_COMMIT_BRANCH == "module_scan"
    when: always
  image:
    name: curlimages/curl:7.79.1
    entrypoint:
    - ''
  script:
  - sh .ci/uplod_modules_report.sh
  artifacts:
    expire_in: 120 min
    paths:
    - "modules.json"
```

```bash
# .ci/modules_report.sh

export SITE=$CI_PROJECT_NAME

jq -nR --argfile input $CI_PROJECT_DIR/composer.lock '
  $input
  | .packages[]
  | {site: env.SITE, name: .name, version: .version, type: .type, id: input}
 ' < <(while true; do uuidgen; done)| jq -s
```

```bash
# .ci/uplod_modules_report.sh


curl \
  -X POST "${MEILIURL}/indexes/modules/documents" \
  --data @modules.json \
  --header "X-Meili-API-Key: ${MEILIAPIKEY}"

```