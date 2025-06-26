// apps/server/lib/elastic.ts
import { Client } from '@elastic/elasticsearch';

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_NODE,
  auth:
    process.env.ELASTICSEARCH_API_KEY
      ?
      {
        apiKey: process.env.ELASTICSEARCH_API_KEY
      }
      : undefined,
});
