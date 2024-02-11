import users from "../database/users";
import { ControllerResponse } from "types/types";
import { IncomingMessage } from 'http';
import { isValidUser } from "./../utils/validate";

let res: ControllerResponse = {
  statusCode: 400,
  content: { message: 'Wrong JSON format' },
};

const createUser = (req: IncomingMessage) => {
  return new Promise((resolve)  => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString() });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (isValidUser(data)) {
          const user = users.addUser(data);
          resolve({ statusCode: 201, content: { data: user } });
        } else {
          res.content.message = 'Request body does not contain required fields';
          resolve(res);
        }
      } catch {
        resolve(res);
      }
    });
  });
}
export default createUser;
