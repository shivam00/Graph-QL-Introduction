import bcrypt from 'bcrypt';

import { makeAndSignToken, validateEmail } from '../resolverUtils';
import { SUPERVISOR_COLLECTION } from '../../../config/constants';

export default async (_, { name, email: paramEmail, password }, ctx) => {
  const { db } = ctx;
  const Supervisor = db.collection(SUPERVISOR_COLLECTION);

  // A simple validator.
  if (!validateEmail(paramEmail)) {
    throw new Error('The email is not a valid email.');
  }

  const userExists = await Supervisor.findOne({ email: paramEmail });
  if (!userExists) {
    const email = paramEmail.toLowerCase(); // because emails do not respect case.
    // 12 cycles
    // Read this: https://security.stackexchange.com/questions/3959/recommended-of-iterations-when-using-pkbdf2-sha256/3993#3993
    const passwordHash = await bcrypt.hash(password, 12);
    const newUserObj = await Supervisor.insertOne({
      name,
      email,
      password: passwordHash,
    });
    // insertOne returns CommandResult instead of the Object
    // Hence, taking out the result
    const newUser = newUserObj.ops[0];
    const JWTtoken = makeAndSignToken({ email });
    newUser.jwt = JWTtoken;
    ctx.user = newUser;
    return newUser;
  }
  throw new Error(`The user with email ${paramEmail} already exists.`);
};
