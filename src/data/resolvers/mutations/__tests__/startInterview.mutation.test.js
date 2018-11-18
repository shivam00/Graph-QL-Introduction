import { graphql } from 'graphql';
import schema from '../../../schema';
import { getDBConnection, getDB } from '../../../../database';
import { CANDIDATE_COLLECTION } from '../../../../config/constants';

describe('start interview mutation', () => {
  let db;
  let dbConnection;

  beforeAll(async () => {
    dbConnection = await getDBConnection();
    db = await getDB();
  });

  afterAll(async () => {
    await db.dropDatabase();
    await dbConnection.close();
  });

  describe('when the candidate exists', () => {
    describe('when the interview field does not exist', () => {
      const request = `
        mutation{
          startInterview( 
            candidateEmail: "b@gmail.com"
          ){  
            _id        
            date
          }
        }
      `;
      it('should set the interviews key and push the interview object', async () => {
        await db.collection(CANDIDATE_COLLECTION).insertOne({
          name: 'Dank Meme',
          email: 'b@gmail.com',
          address: '203, Chinchpokli, Mumbai',
          phone: '9999888777',
          skype: 'dank@123',
        });

        const response = await graphql(schema, request, null, { db, user: {} });
        const { data: { startInterview } } = response;
        expect(startInterview).toHaveProperty('date');
        expect(startInterview).toHaveProperty('_id');
      });

      describe('when the interview field exists', () => {
        it('should push an interview', async () => {
          await graphql(schema, request, null, { db, user: {} });
          const findCandidateDetails = `
            query {
              candidate(
                email: "b@gmail.com"
              ){
                interviews {
                  date
                }
                name
                email
              }
            }
          `;
          const findResponse = await graphql(schema, findCandidateDetails, null, { db, user: {} });
          const { data: { candidate } } = findResponse;
          expect(candidate.interviews.length).toBe(2);
        });
      });
    });
  });
  describe('when the candidate does not exists', () => {
    const request = `
      mutation{
        startInterview( 
          candidateEmail: "nouser@gmail.com"
        ){          
          date
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
});

