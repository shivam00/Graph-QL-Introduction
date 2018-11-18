import {
  GraphQLDateTime,
} from 'graphql-iso-date';

import { Mutation } from './mutations';
import { Query } from './queries';

const resolvers = {
  Query,
  Mutation,
  // Interview: {
  //   takenBy: async (resolvedQuery, _, ctx) => {
  //     const { db } = ctx;
  //     const { takenBy } = resolvedQuery;
  //     let user;
  //     try {
  //       user = await db.collection(USER_COLLECTION).findOne({ email: takenBy });
  //     } catch (err) {
  //       throw new Error('The user does not exist.');
  //     }
  //     return user;
  //   },
  // },
  Timestamp: GraphQLDateTime,
};

export default resolvers;
