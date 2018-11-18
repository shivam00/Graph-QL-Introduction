import { getAuthecticatedUser } from '../resolverUtils';
import { CANDIDATE_COLLECTION } from '../../../config/constants';

export default async (_, { email }, ctx) => {
  getAuthecticatedUser(ctx);
  const { db } = ctx;

  const User = db.collection(CANDIDATE_COLLECTION);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('The user does not exist.');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

