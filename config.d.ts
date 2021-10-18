export interface Config {
    "composerpackages": {
        /**
         * Domain for meilisearch.
         * Example: 'https://meilisearch.url'
         * @visibility frontend
         */
        "url": string;
        /**
         * Apikey to use for connection to meilisearch.
         * Example: '2FXWwAope4nJroSD'
         * @visibility frontend
         */
        "apikey": string;
        /**
         * Index to use in meilisearch.
         * Example: 'modules'
         * @visibility frontend
         */
        "index": string;
    }

}