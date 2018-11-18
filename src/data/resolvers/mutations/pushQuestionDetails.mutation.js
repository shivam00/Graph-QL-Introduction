import { findCandidate } from '../resolverUtils';

export default async (_, { interviewId, candidateEmail, questionDetails }) => {
  const candidate = await findCandidate(candidateEmail);
  const { interviews } = candidate;
  const interview = interviews.find(({ _id }) => _id === interviewId);
  if (interview) {
    interview.questions.push(questionDetails);
    const {
      _id,
      question,
      answer,
      categories,
      givenAnswer,
      score,
    } = questionDetails;
    const questionInfo = {
      _id,
      question,
      answer,
      categories,
    };
    const assignedQuestion = { givenAnswer, score, questionInfo: { ...questionInfo } };
    return assignedQuestion;
  }
  throw new Error('The interview does not exists');
};

