// apps/server/lib/elastic.ts
import { Client } from '@elastic/elasticsearch';


export const esClient = process.env.ELASTICSEARCH_NODE ? new Client({
  node: process.env.ELASTICSEARCH_NODE || "",
  auth:
    process.env.ELASTICSEARCH_API_KEY
      ?
      {
        apiKey: process.env.ELASTICSEARCH_API_KEY
      }
      : undefined,
}) : undefined;
