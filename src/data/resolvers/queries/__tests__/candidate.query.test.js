import { graphql } from 'graphql';
import schema from '../../../schema';
import { CANDIDATE_COLLECTION } from '../../../../config/constants';
import { getDB, getDBConnection } from '../../../../database';

describe('candidate query', () => {
  const expected = {
    name: 'Arfat Salman',
    email: 'shivam@g.c',
    address: '362/2 prem vila meerut',
    phone: '7417997819',
  };
  let DBConnection;
  let db;

  beforeAll(async () => {
    DBConnection = await getDBConnection();
    db = await getDB();
    const Candidate = db.collection(CANDIDATE_COLLECTION);
    await Candidate.insertOne(expected);
  });

  describe('when a valid email is given', () => {
    const queryCandidate = `
      query {
        candidate(email: "shivam@g.c") {
          name

        }
      }
    `;
    it('should return the candidate data', async () => {
      const result = await graphql(schema, queryCandidate, null, { db, user: {} }); // mocking user
      const { data: { candidate } } = result;
      expect(expected).toMatchObject(candidate);
    });
  });


  describe('when the candidate does not exists', () => {
    const query = `
      query {
        candidate(email: "arfat@wayne.com") {
          name
        }
      }
    `;

    it('should throw an error', async () => {
      const result = await graphql(schema, query, null, { db, user: {} }); // mocking user
      const { errors } = result;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not exist'));
    });
  });

  afterAll(async () => {
    await db.dropDatabase();
    await DBConnection.close();
  });
});
