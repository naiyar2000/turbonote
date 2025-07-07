// meili.ts
import { MeiliSearch } from 'meilisearch';
import 'dotenv/config';

export const meili = new MeiliSearch({
    host: process.env.MEILI_URL,
    apiKey: process.env.MEILI_MASTER_KEY, // must match MEILI_MASTER_KEY
});

