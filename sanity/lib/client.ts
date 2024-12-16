import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:'skF3S8CX9FDZT9riBDue3XdzW4fmq8dI7WQvcpxfh4iubV1xrCXYJt7viRF1k2OdwVL1UC49hN7h2nSKyYpepcms9YKs05AzA9OhExCw9bK5aAUgNBaQ3e2tyxImEU3WOTCpP8LRvzsU6H09xGlKZitHsQ7AMuDBBY7WsJ7DNb2uT4Ua0jew'
})
