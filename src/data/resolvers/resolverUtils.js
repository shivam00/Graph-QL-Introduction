import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/env';
import {
  TOKEN_EXPIRY_TIME,
  CANDIDATE_COLLECTION,
  SUPERVISOR_COLLECTION,
} from '../../config/constants';
import { getDB } from '../../database';

export function makeAndSignToken(payload) {
  return jwt.sign({ ...payload }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY_TIME });
}

export function getAuthecticatedUser(ctx) {
  if (ctx.user) {
    return ctx.user;
  }
  throw new Error('Auth Token missing');
}

export function validateEmail(email) {
  const generalEmailRegex = /\S+@\S+\.\S+/;
  return generalEmailRegex.test(email);
}

export async function findCandidate(email) {
  const db = await getDB();
  const user = await db.collection(CANDIDATE_COLLECTION).findOne({ email });
  if (!user) {
    throw new Error('The Candidate does not exist.');
  }
  return user;
}

export async function findSupervisor(email) {
  const db = await getDB();
  const user = await db.collection(SUPERVISOR_COLLECTION).findOne({ email });
  if (!user) {
    throw new Error('The Supervisor does not exist.');
  }
  return user;
}

