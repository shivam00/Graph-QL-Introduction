import bcrypt from 'bcrypt';
import { makeAndSignToken, findSupervisor } from '../resolverUtils';

export default async (_, { email, password }, ctx) => {
  const user = await findSupervisor(email);
  const res = await bcrypt.compare(password, user.password);
  if (res) {
    const JWTtoken = makeAndSignToken({ email });
    user.jwt = JWTtoken;
    ctx.user = user;
    return user;
  }
  throw new Error('Email/Password mismatch');
};
