import uuid from 'uuid/v4';
import {
  getAuthecticatedUser,
  findCandidate,
} from '../resolverUtils';

import { CANDIDATE_COLLECTION } from '../../../config/constants';

async function pushInterviewOfCandidate(payload, ctx) {
  const { candidateEmail } = payload;
  const { db } = ctx;
  const Candidate = db.collection(CANDIDATE_COLLECTION);
  let candidate = await findCandidate(candidateEmail);
  if (candidate) {
    candidate = await Candidate.findOneAndUpdate(
      { email: candidateEmail },
      { $push: { interviews: payload } },
      { returnOriginal: false },
    );
  }
  return payload;
}

export default async (_, { candidateEmail }, ctx) => {
  const supervisor = getAuthecticatedUser(ctx);
  const interview = {
    _id: uuid(),
    date: new Date(),
    takenBy: supervisor.email,
    candidateEmail,
    questions: [],
  };
  return pushInterviewOfCandidate(interview, ctx);
};
