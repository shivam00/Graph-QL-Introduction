import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

export const {
  NODE_ENV,
  DB_URL,
  JWT_SECRET,
  TEST_DB_URL,
  TEST_DB_NAME,
} = process.env;
