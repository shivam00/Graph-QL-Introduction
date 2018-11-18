import { graphql } from 'graphql';
import schema from '../../../schema';
import { getDB, getDBConnection } from '../../../../database';

describe('add candidate mutation', () => {
  let db;
  let dbConnection;
  const request = `
    mutation{
      addCandidate(
        name: "Dank Meme", 
        email: "nice@gmail.com",
        address: "203, Chinchpokli, Mumbai",
        phone: "9999888777",
        skype: "dank@123"
      ){
        name
        email
        address
        phone
        skype
      }
    }
  `;

  beforeAll(async () => {
    dbConnection = await getDBConnection();
    db = await getDB();
  });

  afterAll(async () => {
    await db.dropDatabase();
    await dbConnection.close();
  });
  describe('when candidate does not exist', () => {
    it('should return the added candidate details', async () => {
      const expected = {
        name: 'Dank Meme',
        email: 'nice@gmail.com',
        address: '203, Chinchpokli, Mumbai',
        phone: '9999888777',
        skype: 'dank@123',
      };
      const response = await graphql(schema, request, null, { db });
      const { data: { addCandidate } } = response;
      expect(addCandidate).toMatchObject(expected);
    });
  });
  describe('when email is not valid', () => {
    it('should throw an error of invalid email', async () => {
      const requestInvalidEmail = `
        mutation {
          addCandidate (
            name: "Dank Meme", 
            email: "nicegmail.com",
            address: "203, Chinchpokli, Mumbai",
            phone: "9999888777",
            skype: "dank@123"
          ){
            name
            email
            address
            phone
            skype
          }
        }
      `;
      const response = await graphql(schema, requestInvalidEmail, null, { db });
      const { errors } = response;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('The email is not a valid email.'));
    });
  });
  describe('when candidate exists', () => {
    it('should throw an error', async () => {
      const response = await graphql(schema, request, null, { db });
      const { errors } = response;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('already exists'));
    });
  });
});
