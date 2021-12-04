//set Apollo client 

import { ApolloClient, InMemoryCache } from '@apollo/client';
const baseUri = "http://192.168.1.25:3000/graphql";
const client = new ApolloClient({
  uri: baseUri,
  cache: new InMemoryCache()
});

export default client;