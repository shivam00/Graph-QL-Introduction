import { graphql } from 'graphql';
import schema from '../../../schema';
import { getDBConnection, getDB } from '../../../../database';
import { QUESTION_COLLECTION } from '../../../../config/constants';

describe('questions query', () => {
  const DummyQuestions = [{
    question: 'Difference between angular.js and react.js',
    answer: 'angular.js is a framework and react.js is a library',
    categories: ['React.js'],
  }, {
    question: 'Difference between angular.js and .js',
    answer: 'angular.js is a framework and react.js is a library',
    categories: ['React.js'],
  }];
  let DBConnection;
  let db;

  beforeAll(async () => {
    DBConnection = await getDBConnection();
    db = await getDB();
    const Question = db.collection(QUESTION_COLLECTION);
    await Question.insert(DummyQuestions);
  });
  describe('when questions are present ', () => {
    const query = `
      query {
        questions(offset : 1, categories : ["Angular.js", "React.js"]){
          answer
          question
          categories
        }
      }
    `;
    it('should return one question', async () => {
      const result = await graphql(schema, query, null, { db, user: {} });
      const { data: { questions } } = result;
      expect(questions.length).toBe(1);
    });
  });

  describe('when questions are present ', () => {
    const query = `
      query {
        questions(offset : 10, categories : ["Angular.js", "React.js"]){
          answer
          question
          categories
        }
      }
    `;
    it('should return questions having Angular.js and React.js categories', async () => {
      const result = await graphql(schema, query, null, { db, user: {} });
      const { data: { questions } } = result;
      expect(DummyQuestions).toMatchObject(questions);
    });
  });

  afterAll(async () => {
    await db.dropDatabase();
    await DBConnection.close();
  });
});
