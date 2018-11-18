import { CANDIDATE_COLLECTION } from '../../../config/constants';
import { validateEmail } from '../resolverUtils';

export default async (_, {
  name,
  email,
  address,
  phone,
  skype,
}, ctx) => {
  const { db } = ctx;
  if (!validateEmail(email)) {
    throw new Error('The email is not a valid email.');
  }
  const candidateExists = await db.collection(CANDIDATE_COLLECTION).findOne({ email });
  if (!candidateExists) {
    const addedCandidate = await db.collection(CANDIDATE_COLLECTION).insertOne({
      name,
      email,
      address,
      phone,
      skype,
    });
    return addedCandidate.ops[0];
  }
  throw new Error(`The Candidate with email ${email} already exists.`);
};
