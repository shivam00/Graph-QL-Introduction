import { QUESTION_COLLECTION } from '../../../config/constants';
import { getAuthecticatedUser } from '../resolverUtils';

export default async (_, { question, answer, categories }, ctx) => {
  getAuthecticatedUser(ctx);
  const { db } = ctx;
  const questionCollection = db.collection(QUESTION_COLLECTION);
  const questionAdded = await questionCollection.insertOne({ question, answer, categories });
  return questionAdded.ops[0];
};
