import jwt from 'jsonwebtoken';

import { makeAndSignToken } from '../resolverUtils';
import { JWT_SECRET } from '../../../config/env';

describe('makeAndSignToken', () => {
  describe('when payload is provided', () => {
    const payload = {
      email: 'bruce@wayne.com',
    };

    const token = makeAndSignToken(payload);
    it('should return the correct token', () => {
      const decoded = jwt.verify(token, JWT_SECRET);

      expect(decoded).toBeDefined();
      expect(decoded).toHaveProperty('email');
    });
  });
});
