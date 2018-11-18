import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
