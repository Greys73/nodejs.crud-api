import { validate } from 'uuid';
import { IncomingMessage } from 'http';
import users from '../database/users';
import { isValidUser } from '../utils/validate';
import {
  ERROR_FIELDS,
  ERROR_JSON,
  ERROR_UUID,
  USER_NOT_FOUND,
} from '../utils/responses';
import getUser from './getUser';

const updateUser = (id: string, req: IncomingMessage) => {
  if (!validate(id))
    return new Promise((resolve) => {
      resolve(ERROR_UUID);
    });

  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (isValidUser(data)) {
          if (getUser(id).statusCode === 200) {
            const user = users.updateUser({ id, ...data });
            resolve({ statusCode: 200, content: { data: user } });
          } else {
            resolve(USER_NOT_FOUND);
          }
        } else {
          resolve(ERROR_FIELDS);
        }
      } catch {
        resolve(ERROR_JSON);
      }
    });
  });
};
export default updateUser;
