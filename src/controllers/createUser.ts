import users from '../database/users';
import { IncomingMessage } from 'http';
import { isValidUser } from './../utils/validate';
import { ERROR_FIELDS, ERROR_JSON } from './../utils/responses';

const createUser = (req: IncomingMessage) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (isValidUser(data)) {
          const user = users.addUser(data);
          resolve({ statusCode: 201, content: { data: user } });
        } else {
          resolve(ERROR_FIELDS);
        }
      } catch {
        resolve(ERROR_JSON);
      }
    });
  });
};
export default createUser;
