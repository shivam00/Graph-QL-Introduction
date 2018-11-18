import { graphql } from 'graphql';
import { getDB, getDBConnection } from '../../../../database';
import schema from '../../../schema';

describe('signup mutation', async () => {
  const expected = {
    name: 'Bruce Wayne',
    email: 'bruce@wayne.com',
  };
  let db;
  let DBConnection;

  const mutationQuery = `
    mutation {
      signup(name: "Bruce Wayne", email: "bruce@wayne.com", password:"shhhhhh!") {
        name
        email
        jwt
      }
    }
  `;

  beforeAll(async () => {
    DBConnection = await getDBConnection();
    db = await getDB();
  });

  describe('when correct details are provided', () => {
    it('should register the user and return JWT', async () => {
      const query = await graphql(schema, mutationQuery, null, { db });
      const { data: { signup } } = query;
      expect(signup).toHaveProperty('jwt');
      expect(signup).toMatchObject(expected);
    });
  });

  describe('when the email already exists', () => {
    it('should throw an error', async () => {
      const query = await graphql(schema, mutationQuery, null, { db });
      const { errors } = query;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('already exists'));
    });
  });

  describe('when the email is not valid', () => {
    it('should throw an error', async () => {
      const query = `
        mutation {
          signup(name: "Bruce Wayne", email: "bruce.com", password:"shhhhhh!") {
            jwt
          }
        }
      `;
      const result = await graphql(schema, query, null, { db });
      const { errors } = result;
      expect(errors).toBeDefined();
      expect(errors[0].message).toEqual(expect.stringContaining('not a valid email'));
    });
  });

  afterAll(async () => {
    await db.dropDatabase();
    await DBConnection.close();
  });
});

