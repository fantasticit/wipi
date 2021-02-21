const { Client } = require('@elastic/elasticsearch');
export const client = new Client({ node: 'http://localhost:9200' });

export const transformResponse = (response) => {
  const ret = (response.body && response.body.hits && response.body.hits.hits) || null;
  return ret && ret.length ? ret.map((r) => r._source) : ret;
};
