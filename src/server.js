import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import jwt from 'express-jwt';

import { JWT_SECRET } from './config/env';
// import { DATABASE_NAME } from './config/constants';
import schema from './data/schema';
import { getDB } from './database';

export default async () => {
  const app = express();
  const db = await getDB();

  // Routes
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    jwt({
      secret: JWT_SECRET,
      credentialsRequired: false,
    }),
    graphqlExpress(req => (
      {
        schema,
        context: {
          db,
          user: req.user || null, // req.user is set by jwt after verification
        },
      })),
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  return app;
};
