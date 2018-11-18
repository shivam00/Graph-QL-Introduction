import { graphql } from 'graphql';
import schema from '../../../schema';
import { getDB, getDBConnection } from '../../../../database';

describe('Adding a question', () => {
  const expected = {
    question: 'Difference between angular.js and react.js',
    answer: 'angular.js is a framework and react.js is a library',
    categories: ['React.js'],
  };
  let DBConnection;
  let db;
  beforeAll(async () => {
    DBConnection = await getDBConnection();
    db = await getDB();
  });
  describe('when a question is added it should return a question', () => {
    const mutationQuery = `
      mutation {
        addQuestion(question: "Difference between angular.js and react.js",
        answer: "angular.js is a framework and react.js is a library",
        categories: ["React.js"]) {
          question
          answer
          categories
        }
      }
    `;

    it('should return the added question', async () => {
      const query = await graphql(schema, mutationQuery, null, { db, user: {} });
      const { data: { addQuestion } } = query;
      expect(addQuestion).toHaveProperty('question');
      expect(addQuestion).toMatchObject(expected);
    });
  });


  afterAll(async () => {
    await db.dropDatabase();
    await DBConnection.close();
  });
});
