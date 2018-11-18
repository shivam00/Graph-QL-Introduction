import { MongoClient } from 'mongodb';

import { TEST_DB_URL } from '../config/env';

// For instrcutional purpose
export default function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(TEST_DB_URL, (error, db) => {
      if (!error) {
        resolve(db);
      }
      reject(new Error('Cannot connect to the MongoDB server'));
    });
  });
}
