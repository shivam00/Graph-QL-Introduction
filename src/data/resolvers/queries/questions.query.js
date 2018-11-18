import { getAuthecticatedUser } from '../resolverUtils';
import { QUESTION_COLLECTION } from '../../../config/constants';

export default async (_, { offset, categories }, ctx) => {
  getAuthecticatedUser(ctx);
  const { db } = ctx;
  const Questions = db.collection(QUESTION_COLLECTION);
  const questions = await Questions.find({ categories: { $in: categories } })
    .limit(offset).toArray();
  return questions;
};
