import { MongoClient } from 'mongodb';
import { DB_URL, NODE_ENV, TEST_DB_URL, TEST_DB_NAME } from './config/env';
import { DATABASE_NAME } from './config/constants';

let dbConnectionSocket = null;

export const getDBConnection = async () => {
  // If db is not initialised, make a new connection
  // set it to DB and return it.
  if (!dbConnectionSocket) {
    if (NODE_ENV === 'test') {
      dbConnectionSocket = await MongoClient.connect(TEST_DB_URL);
    } else {
      dbConnectionSocket = await MongoClient.connect(DB_URL);
    }
  }

  return dbConnectionSocket;
};

export const getDB = async () => {
  await getDBConnection();

  if (!dbConnectionSocket) {
    throw new Error('DB not connected');
  }

  if (NODE_ENV === 'test') {
    return dbConnectionSocket.db(TEST_DB_NAME);
  }

  return dbConnectionSocket.db(DATABASE_NAME);
};
