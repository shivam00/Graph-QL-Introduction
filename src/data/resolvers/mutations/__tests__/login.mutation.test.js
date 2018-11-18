import { graphql } from 'graphql';
import { SUPERVISOR_COLLECTION } from '../../../../config/constants';
import schema from '../../../schema';
import { getDB, getDBConnection } from '../../../../database';

describe('login mutation', async () => {
  const expected = {
    name: 'Bruce Wayne',
    email: 'bruce@wayne.com',
  };
  let db;
  let DBConnection;

  beforeAll(async () => {
    DBConnection = await getDBConnection();
    db = await getDB();
    const User = db.collection(SUPERVISOR_COLLECTION);
    await User.insertOne({
      ...expected,
      password: '$2a$12$TWiy.hhttZVFP.ZXEG9tB.oEJB5tNWF7j97S0Fwb1qPt5yDFBQV1m', // super-secret
    });
  });

  describe('when the email and password is correct', () => {
    const mutationQuery = `
      mutation {
        login(email: "bruce@wayne.com", password:"super-secret") {
          name
          email
          jwt
        }
      }
    `;

    it('should return the JWT', async () => {
      const query = await graphql(schema, mutationQuery, null, { db });
      const { data: { login } } = query;
      expect(login).toHaveProperty('jwt');
      expect(login).toMatchObject(expected);
    });
  });

  describe('when the email and password mismatch', () => {
    const mutationQuery = `
      mutation {
        login(email: "bruce@wayne.com", password:"random-shit") {
          name
          email
          jwt
        }
      }
    `;

    it('should throw an error', async () => {
      const query = await graphql(schema, mutationQuery, null, { db });
      const { errors } = query;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('mismatch'));
    });
  });

  describe('when the user does not exist', () => {
    const mutationQuery = `
      mutation {
        login(email: "random@shit.com", password:"random-shit") {
          name
          email
          jwt
        }
      }
    `;

    it('should throw an error', async () => {
      const query = await graphql(schema, mutationQuery, null, { db });
      const { errors } = query;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not exist'));
    });
  });

  afterAll(async () => {
    await db.dropDatabase();
    await DBConnection.close();
  });
});
