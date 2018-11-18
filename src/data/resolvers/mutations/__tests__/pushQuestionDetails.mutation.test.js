import { graphql } from 'graphql';
import schema from '../../../schema';
import { getDBConnection, getDB } from '../../../../database';
import { CANDIDATE_COLLECTION } from '../../../../config/constants';

describe('push question detail mutation', () => {
  let dbConnection;
  let db;

  beforeAll(async () => {
    dbConnection = await getDBConnection();
    db = await getDB();
  });

  afterAll(async () => {
    await db.dropDatabase();
    await dbConnection.close();
  });

  describe('when the correct question details are provided', () => {
    const request = `
      mutation {
        pushQuestionDetails(
          interviewId: "0569283d-bd0b-4444-bc26-0fe7fdb544c3",
          candidateEmail: "mail@gmail.com",
          questionDetails: {
            _id: "1",
            question: "How are you?",
            answer: "I am fine",
            givenAnswer: "I am fine code",
            score: 10,
            categories: ["Node"]
          }
        ) {
          questionInfo {
            _id
            question
            answer
            categories
          }
          givenAnswer
        }
      }
    `;
    const expected = {
      questionInfo: {
        _id: '1',
        question: 'How are you?',
        answer: 'I am fine',
        categories: [
          'Node',
        ],
      },
      givenAnswer: 'I am fine code',
    };
    it('should return assigned question', async () => {
      await db.collection(CANDIDATE_COLLECTION).insertOne({
        name: 'Some one',
        email: 'mail@gmail.com',
        interviews: [{ _id: '0569283d-bd0b-4444-bc26-0fe7fdb544c3', questions: [] }],
      });
      const response = await graphql(schema, request, null, { db, user: {} });
      const { data: { pushQuestionDetails } } = response;
      expect(pushQuestionDetails).toMatchObject(expected);
    });
  });
  describe('when the interview id is incorrect', () => {
    const request = `
      mutation {
        pushQuestionDetails(
          interviewId: "0569283d-bd0b-4444-bc26-0fe7fdb544c",
          candidateEmail: "mail@gmail.com",
          questionDetails: {
            _id: "1",
            question: "How are you?",
            answer: "I am fine",
            givenAnswer: "I am fine code",
            score: 10,
            categories: ["Node"]
          }
        ) {
          questionInfo {
            _id
            question
            answer
            categories
          }
          givenAnswer
        }
      }
    `;
    it('should throw an error', async () => {
      const response = await graphql(schema, request, null, { db, user: {} });
      const { errors } = response;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not exist'));
    });
  });
  describe('when the candidate email is incorrect', () => {
    const request = `
      mutation {
        pushQuestionDetails(
          interviewId: "0569283d-bd0b-4444-bc26-0fe7fdb544c3",
          candidateEmail: "mailer@gmail.com",
          questionDetails: {
            _id: "1",
            question: "How are you?",
            answer: "I am fine",
            givenAnswer: "I am fine code",
            score: 10,
            categories: ["Node"]
          }
        ) {
          questionInfo {
            _id
            question
            answer
            categories
          }
          givenAnswer
        }
      }
    `;
    it('should throw an error', async () => {
      const response = await graphql(schema, request, null, { db, user: {} });
      const { errors } = response;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not exist'));
    });
    it('should throw an error', async () => {
      const response = await graphql(schema, request, null, { db, user: {} });
      const { errors } = response;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not exist'));
    });
  });
});
